import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const onValueChange = (event) => {
    setEnteredValue(event.target.value);
  };

  const onValueBlur = (event) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    onValueChange,
    onValueBlur,
  };
};

export default useInput;
