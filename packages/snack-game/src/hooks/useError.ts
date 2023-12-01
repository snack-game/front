import { useEffect, useState } from 'react';

const useError = () => {
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
};

export default useError;
