import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debaucedValue, setDebauncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebauncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debaucedValue;
}
