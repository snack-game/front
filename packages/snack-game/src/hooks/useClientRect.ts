import { RefObject, useEffect, useState } from 'react';

export const useClientRect = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const setClientRect = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    };

    setClientRect();

    window.addEventListener('resize', setClientRect);

    return () => {
      window.removeEventListener('resize', setClientRect);
    };
  }, []);

  return { width, height };
};
