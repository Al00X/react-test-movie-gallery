import { useEffect, useState } from "react";

// Makes your input debounced in the given delay and returns the debounced value.
export default function useDebounce<T>(value: T, wait: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);
    return () => {
      clearTimeout(handler);
    };
  }, [value, wait]);
  return debouncedValue;
}
