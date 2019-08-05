import { useState } from "react";

export const useInput2 = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [checked, setChecked] = useState(initialValue);
  return {
    value,
    setValue,
    checked,
    setChecked,
    reset: () => setValue(""),
    resetChecked: () => setChecked(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      }
    },
    bindBtn: {
      checked,
      onChange: (event) => {
        setChecked(event.target.checked);
      }
    }
  };
};
