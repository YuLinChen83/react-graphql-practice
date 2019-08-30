import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log('onChange!');
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('onSubmit!');
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
