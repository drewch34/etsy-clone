import { useEffect, useRef, useState } from "react";
import * as yup from "yup";

export function useForm(fields) {
  const [values, setValues] = useState(getInitialValues(fields));
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const onSubmitRef = useRef(false);
  const subscribedFieldsRef = useRef({});
  const schemaRef = useRef(createYupShapeSchema(fields));

  function getErrors(yupErrorObject) {
    return yupErrorObject.inner.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.path]: [...(prev[curr.path] || []), curr.message],
      }),
      {}
    );
  }

  async function validateForm(values, schema) {
    try {
      const validForm = await yup
        .object()
        .shape(schema)
        .validate(values, { abortEarly: false });
      return validForm;
    } catch (e) {
      setErrors(getErrors(e));
    }
  }

  async function validateField(fieldName, fieldValue, schema) {
    try {
      await schema[fieldName].validate(fieldValue, {
        abortEarly: false,
      });
      setErrors((prev) => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    } catch (e) {
      setErrors((state) => ({ ...state, [fieldName]: e.errors }));
    }
  }

  function _onChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    if (errors[fieldName])
      validateField(fieldName, fieldValue, schemaRef.current);

    setValues((state) => ({ ...state, [fieldName]: fieldValue }));
  }

  function onChange(handleChange) {
    return {
      onChange: async (event) => {
        _onChange(event);
        if (handleChange) handleChange(event);
      },
    };
  }

  function getValuesFromSubscribedFields(values) {
    return Object.keys(values).reduce((subscribedValues, key) => {
      if (subscribedFieldsRef.current[key])
        return { ...subscribedValues, [key]: values[key] };
      return subscribedValues;
    }, {});
  }

  function getSchemaFromSubscribedFields(schema) {
    return Object.keys(schema).reduce((subscribedSchema, key) => {
      if (subscribedFieldsRef.current[key])
        return { ...subscribedSchema, [key]: schema[key] };
      return subscribedSchema;
    }, {});
  }

  function onSubmit(handleSubmit) {
    return {
      onSubmit: async (event) => {
        event.preventDefault();

        const subscribedValues = getValuesFromSubscribedFields(values);
        const subscribedSchema = getSchemaFromSubscribedFields(
          schemaRef.current
        );
        const validForm = await validateForm(
          subscribedValues,
          subscribedSchema
        );
        if (!validForm) return;

        handleSubmit(event);
      },
      ref: formRef,
    };
  }

  function submit() {
    onSubmitRef.current = true;
  }

  function _dispatchPendingFormSubmission() {
    if (!onSubmitRef.current) return;
    // when [values] finish updating and there is a pending form submission
    formRef.current.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
    onSubmitRef.current = false;
  }
  useEffect(_dispatchPendingFormSubmission, [values]);

  function subscribe(fieldId) {
    subscribedFieldsRef.current = {
      ...subscribedFieldsRef.current,
      [fieldId]: true,
    };

    return {
      value: values[fieldId] || "",
      onChange: _onChange,
      errors: errors[fieldId],
      name: fieldId,
      id: fieldId,
    };
  }

  function unsubscribe(fieldId) {
    const { [fieldId]: removedProperty, ...rest } = subscribedFieldsRef.current;
    subscribedFieldsRef.current = rest;

    return null;
  }

  function resetField(fieldId) {
    const initialValues = getInitialValues(fields);
    setValues((values) => ({
      ...values,
      [fieldId]: initialValues[fieldId] || "",
    }));
    setErrors((errors) => {
      const { [fieldId]: removedField, ...rest } = errors;
      return { ...rest };
    });
  }

  return {
    values,
    errors,
    subscribe,
    unsubscribe,
    onSubmit,
    submit,
    onChange,
    resetField,
  };
}

function createYupShapeSchema(formFields) {
  return formFields.reduce((shapeSchema, field) => {
    const {
      id,
      validation: { schema, methods },
    } = field;

    if (!yup[schema]) return shapeSchema;
    let fieldValidation = methods.reduce((yupSchema, method) => {
      const { type, params = [] } = method;

      if (!yupSchema[type]) return yupSchema;
      return yupSchema[type](...params);
    }, yup[schema]());

    return { ...shapeSchema, [id]: fieldValidation };
  }, {});
}

function getInitialValues(formFields) {
  return formFields.reduce((initialValues, field) => {
    if (!field.initialValue) return initialValues;
    return { ...initialValues, [field.id]: field.initialValue };
  }, {});
}
