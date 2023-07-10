import { RefObject, useEffect, useState } from 'react';

interface useClientRectProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

export const useClientRect = ({ canvasBaseRef }: useClientRectProps) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const setClientRect = () => {
      if (canvasBaseRef.current) {
        setWidth(canvasBaseRef.current.clientWidth);
        setHeight(canvasBaseRef.current.clientHeight);
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
