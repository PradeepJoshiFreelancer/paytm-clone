import { useEffect, useState } from "react";

interface useDebounceProps {
  value: string;
  timeout: number;
}
const useDebounced = ({value, timeout}: useDebounceProps) => {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [value, setDebouncedValue, timeout]);

  return debounceValue;
};

export default useDebounced;
