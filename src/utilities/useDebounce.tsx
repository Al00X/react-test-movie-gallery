import { useEffect, useState } from "react";

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
