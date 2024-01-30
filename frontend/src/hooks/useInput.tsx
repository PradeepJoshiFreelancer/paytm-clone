import { useState } from "react";

function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const hasError = validateValue(enteredValue) && isTouched;

  const enteredValueHandller = (event) => {
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  const enteredValueBlurrHandller = (event) => {
    setIsTouched(true);
  };

  const reset = () =>{
    setEnteredValue("")
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    hasError,
    reset,
    enteredValueHandller,
    enteredValueBlurrHandller,
  };
}

export default useInput