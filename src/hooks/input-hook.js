import { useState } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState([]);
  return {
    value,
    error,
    setValue,
    setError,
    reset: () => setValue(""),
    resetError: () => setError([]),
    bind: {
      value,
      error,
      onChange: (event) => {
        setValue(event.target.value);
        let errors = validator(event.target.value);
        setError(errors);
      }
    }
  };
};
