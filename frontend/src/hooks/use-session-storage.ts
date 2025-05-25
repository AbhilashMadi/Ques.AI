import { useState, useEffect } from 'react';

export default function useSessionStorage<T>(key: string, initialValue: T | (() => T)) {
  // Get initial value from sessionStorage or fallback to initialValue
  const getStoredValue = (): T => {
    try {
      const stored = sessionStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored) as T;
      }
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue;
    }
  };

  const [value, setValue] = useState<T>(getStoredValue);

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
