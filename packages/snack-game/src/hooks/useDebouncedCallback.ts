import { useCallback, useState } from 'react';

type CallbackFunction = (...params: unknown[]) => void;

interface useDebouncedCallbackProps {
  target: CallbackFunction;
  delay: number;
}

const useDebouncedCallback = ({ target, delay }: useDebouncedCallbackProps) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...params: Parameters<CallbackFunction>) => {
      if (timerId) {
        clearTimeout(timerId);
      }

      const newTimerId = setTimeout(() => {
        target(...params);
      }, delay);

      setTimerId(newTimerId);
    },
    [target, delay, timerId],
  );
};

export default useDebouncedCallback;
