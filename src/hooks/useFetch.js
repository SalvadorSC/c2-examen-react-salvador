import { useCallback, useState } from "react";

export const useFetch = () => {
  const [error, setError] = useState(false);
  const fetchGlobal = useCallback(async (url, opciones = {}) => {
    setError(false);
    const resp = await fetch(url, opciones);
    if (!resp.ok) {
      setError(true);
      return false;
    }
    return await resp.json();
  }, []);

  return {
    error,
    fetchGlobal,
  };
};
