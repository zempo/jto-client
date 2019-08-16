import { useState } from "react";

export const useForm = (initialValues, initialErrors, initialFiles, validators) => {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState(initialErrors);

  return {
    values,
    files,
    errors,
    handleChange: (e) => {
      if (e.target.files) {
        let file = e.target.files[0];
        setFiles({ ...files, [e.target.name]: file });
      } else {
        let error = validators[`${e.target.id}`](e.target.value);
        setErrors({ ...errors, [e.target.id]: error });
        setValues({
          ...values,
          [e.target.name]: e.target.value
        });
      }
    },
    reset: () => {
      setValues(initialValues);
      setFiles(initialFiles);
      setErrors(initialErrors);
    }
  };
};

// import React from 'react';
// import { useForm } from '../hooks/useForm';
// import history from '../history';
// export default function SignInForm() {
//     const { values, handleChange, reset } = useForm({ email: '', password: '' });
//     const handleSubmit = e => {
//         e.preventDefault();
//         reset();
//         history.goBack();
//     };
//     return (
//         <form onSubmit={handleSubmit} className='SignIn__form'>
//             <input
//                 className='SignIn__form--input'
//                 type='email'
//                 name='email'
//                 placeholder='Enter your email...'
//                 onChange={handleChange}
//                 value={values.email}
//             />
//             <input
//                 className='SignIn__form--input'
//                 type='password'
//                 name='password'
//                 placeholder='Enter your password...'
//                 onChange={handleChange}
//                 value={values.password}
//             />
//             <button className='Button' type='submit'>
//                 Sign In
//             </button>
//         </form>
//     );
// }
