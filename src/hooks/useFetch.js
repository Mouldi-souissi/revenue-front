import { useEffect, useState } from "react";

const useFetch = (callback) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
      const data = await callback();
      setData(data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    handleFetch();
    return () => {
      setData(null);
      setLoading(false);
      setError(null);
    };
  }, []);

  return { data, isLoading, error };
};

export { useFetch };
