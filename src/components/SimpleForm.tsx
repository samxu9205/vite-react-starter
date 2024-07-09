// src/components/SimpleForm.js
import React from 'react';
import useSimpleForm from '../hooks/useSimpleForm';

const SimpleForm = () => {
  const { register, handleSubmit, errors } = useSimpleForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: true })} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email', { required: true })} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
