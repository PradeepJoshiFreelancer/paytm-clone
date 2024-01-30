import { useState } from "react";

function useInput(validateValue: (value: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const hasError = validateValue(enteredValue) && isTouched;

  const enteredValueHandller: (e: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  const enteredValueBlurrHandller: () => void = () => {
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