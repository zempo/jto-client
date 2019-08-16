import { useState } from "react";

export const useInput2 = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState(initialValue);
  return {
    value,
    setValue,
    checked,
    setChecked,
    radio,
    setRadio,
    reset: () => setValue(""),
    resetChecked: () => setChecked(false),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      }
    },
    bindBtn: {
      checked,
      radio,
      onChange: (event) => {
        // setChecked(event.target.checked);
        console.log(event.target.checked, event.target.id);
        setChecked(true);
        setRadio(event.target.id);
      }
    }
  };
};

// import { useState } from 'react';

// export const useForm = initialValues => { const [values, setValues] = useState(initialValues);

// return {
// 	values,
// 	handleChange: e => {
// 		setValues({
// 			...values,
// 			[e.target.name]: e.target.value,
// 		});
// 	},
// 	reset: () => setValues(initialValues),
// };
// };

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
