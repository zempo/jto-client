import { useState } from "react";

export const useRadio = (initialValues, initialChecked) => {
  const [radioValues, setRadioValues] = useState(initialValues);
  const [checked, setChecked] = useState(initialChecked)

  return {
    values,
    handleChange: (e) => {
        setRadioValues({
          ...radioValues,
          [e.target.name]: e.target.value
        });

        setChecked({
            ...checked,
            [e.target.name]: e.target.checked
        })
    },
    reset: () => {
      setRadioValues(initialValues);
      setChecked(initialChecked)
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
