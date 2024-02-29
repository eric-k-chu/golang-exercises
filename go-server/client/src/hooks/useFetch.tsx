import { useEffect, useState } from "react";

export function useFetch<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await fn();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoading === undefined) load();
  }, [isLoading]);

  return [data, isLoading, error] as const;
}
