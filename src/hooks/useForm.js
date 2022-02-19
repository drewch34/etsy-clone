import { useMemo, useState } from "react";
import * as yup from "yup";

export function useForm(fields) {
  const [values, setFormValues] = useState({});
  const [errors, setFormErrors] = useState({});
  const schema = useMemo(() => createYupShapeSchema(fields), [fields]);

  function getErrors(yupErrorObject) {
    return yupErrorObject.inner.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.path]: [...(prev[curr.path] || []), curr.message],
      }),
      {}
    );
  }

  async function validateForm(values) {
    try {
      const validForm = await yup
        .object()
        .shape(schema)
        .validate(values, { abortEarly: false });
      return validForm;
    } catch (e) {
      setFormErrors(getErrors(e));
    }
  }

  async function validateField(fieldName, fieldValue) {
    try {
      await schema[fieldName].validate(fieldValue, { abortEarly: false });
      setFormErrors((prev) => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    } catch (e) {
      setFormErrors((state) => ({ ...state, [fieldName]: e.errors }));
    }
  }

  function onChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    if (errors[fieldName]) validateField(fieldName, fieldValue);
    setFormValues((state) => ({ ...state, [fieldName]: fieldValue }));
  }

  function onSubmit(handleSubmit) {
    return {
      onSubmit: async (event) => {
        event.preventDefault();

        const validForm = await validateForm(values);
        if (!validForm) return;

        handleSubmit(event);
      },
    };
  }

  function subscribe(fieldId) {
    return {
      value: values[fieldId],
      onChange: onChange,
      errors: errors[fieldId],
      name: fieldId,
      id: fieldId,
    };
  }

  return { values, errors, subscribe, onSubmit };
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
