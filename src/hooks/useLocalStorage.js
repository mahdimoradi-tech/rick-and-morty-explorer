import { useEffect, useState } from "react";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initial,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
