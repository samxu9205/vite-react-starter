// src/hooks/useSimpleForm.js
import { useState, useRef } from 'react';

const useSimpleForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const inputs = useRef({});

  const register = (name, rules) => {
    return {
      name,
      ref: (el) => {
        if (el) inputs.current[name] = { el, rules };
      },
      onChange: (e) => setValues({ ...values, [name]: e.target.value }),
      onBlur: () => validateField(name),
    };
  };

  const validateField = (name) => {
    const { rules } = inputs.current[name];
    const value = values[name];
    let error = '';

    if (rules.required && !value) {
      error = 'This field is required';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(inputs.current).forEach((name) => {
      validateField(name);
      if (errors[name]) valid = false;
    });

    if (valid) callback(values);
  };

  return { register, handleSubmit, errors };
};

export default useSimpleForm;
