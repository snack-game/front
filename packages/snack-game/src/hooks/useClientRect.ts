import { RefObject, useEffect, useState } from 'react';

interface useClientRectProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

export const useClientRect = ({ canvasBaseRef }: useClientRectProps) => {
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);
  const [clientLeft, setClientLeft] = useState<number>(0);
  const [clientTop, setClientTop] = useState<number>(0);

  useEffect(() => {
    const setClientRect = () => {
      if (canvasBaseRef.current) {
        const rect = canvasBaseRef.current.getBoundingClientRect();
        setClientWidth(rect.width);
        setClientHeight(rect.height);
        setClientLeft(rect.left);
        setClientTop(rect.top);
      }
    };

    setClientRect();

    window.addEventListener('resize', setClientRect);

    return () => {
      window.removeEventListener('resize', setClientRect);
    };
  }, []);

  return { clientWidth, clientHeight, clientLeft, clientTop };
};
