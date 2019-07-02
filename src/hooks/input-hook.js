import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [files, setFiles] = useState(null);
  return {
    value,
    files,
    setValue,
    setFiles,
    reset: () => setValue(""),
    fileReset: () => setFiles(null),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      }
    },
    fileBind: {
      files,
      onChange: (event) => {
        setFiles(event.target.files[0])
      }
    }
  };
};
