import { useState } from "react";
import * as yup from "yup";

export function useForm(schema) {
  const [values, setFormValues] = useState({});
  const [errors, setFormErrors] = useState({});

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

  function onFormFieldChange(fieldName, fieldValue) {
    if (errors[fieldName]) validateField(fieldName, fieldValue);
    setFormValues((state) => ({ ...state, [fieldName]: fieldValue }));
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    const validForm = await validateForm(values);
    if (!validForm) return;

    return validForm;
  }

  return { values, errors, onFormFieldChange, onFormSubmit };
}
