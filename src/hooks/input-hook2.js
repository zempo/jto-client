import { useState } from "react";

export const useInput2 = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [checked, setChecked] = useState(initialValue);
  const [radio, setRadio] = useState(initialValue);
  return {
    value,
    setValue,
    checked,
    setChecked,
    radio,
    setRadio,
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
      radio,
      onChange: (event) => {
        setChecked(event.target.checked);
        setRadio(event.target.id);
      }
    }
  };
};
