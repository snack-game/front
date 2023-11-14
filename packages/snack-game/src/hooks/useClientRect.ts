import { RefObject, useEffect, useState } from 'react';

import useDebouncedCallback from '@hooks/useDebouncedCallback';

interface useClientRectProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

export const useClientRect = ({ canvasBaseRef }: useClientRectProps) => {
  const [offsetWidth, setOffsetWidth] = useState<number>(0);
  const [offsetHeight, setOffsetHeight] = useState<number>(0);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const debouncedSetClientRect = useDebouncedCallback({
    target: () => {
      if (canvasBaseRef.current) {
        setOffsetWidth(canvasBaseRef.current.offsetWidth);
        setOffsetHeight(canvasBaseRef.current.offsetHeight);
        setOffsetTop(canvasBaseRef.current.offsetTop);
        setOffsetLeft(canvasBaseRef.current.offsetLeft);
      }
    },
    delay: 300,
  });

  useEffect(() => {
    debouncedSetClientRect();

    window.addEventListener('resize', debouncedSetClientRect);

    return () => {
      window.removeEventListener('resize', debouncedSetClientRect);
    };
  }, []);

  return {
    offsetWidth,
    offsetHeight,
    offsetLeft,
    offsetTop,
  };
};
