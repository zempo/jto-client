import { useState } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [files, setFiles] = useState(null);
  const [error, setError] = useState([]);

  return {
    value,
    files,
    error,
    setValue,
    setFiles,
    setError,
    reset: () => setValue(""),
    fileReset: () => setFiles(null),
    resetError: () => setError([]),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
        let errors = validator(event.target.value);
        setError(errors);
      }
    },
    fileBind: {
      files,
      onChange: (event) => {
        setFiles(event.target.files[0]);
      }
    }
  };
};
