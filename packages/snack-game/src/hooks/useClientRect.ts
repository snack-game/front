import { RefObject, useEffect, useState } from 'react';

import useDebouncedCallback from '@hooks/useDebouncedCallback';

interface useClientRectProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

export const useClientRect = ({ canvasBaseRef }: useClientRectProps) => {
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);
  const [clientLeft, setClientLeft] = useState<number>(0);
  const [clientTop, setClientTop] = useState<number>(0);

  const debouncedSetClientRect = useDebouncedCallback({
    target: () => {
      if (canvasBaseRef.current) {
        const rect = canvasBaseRef.current.getBoundingClientRect();
        setClientWidth(rect.width);
        setClientHeight(rect.height);
        setClientLeft(rect.left);
        setClientTop(rect.top);
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

  return { clientWidth, clientHeight, clientLeft, clientTop };
};
