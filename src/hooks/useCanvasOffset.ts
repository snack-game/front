import { useEffect, useRef, useState } from 'react';

import useDebouncedCallback from '@hooks/useDebouncedCallback';

interface canvasOffsetType {
  offsetWidth: number;
  offsetHeight: number;
  offsetLeft: number;
  offsetTop: number;
}

export const useCanvasOffset = () => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);
  const [canvasOffset, setCanvasOffset] = useState<canvasOffsetType>({
    offsetWidth: 0,
    offsetHeight: 0,
    offsetLeft: 0,
    offsetTop: 0,
  });

  const clientRect = useDebouncedCallback({
    target: () => {
      if (canvasBaseRef.current) {
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
          canvasBaseRef.current;
        setCanvasOffset({
          offsetWidth,
          offsetHeight,
          offsetLeft,
          offsetTop,
        });
      }
    },
    delay: 300,
  });

  useEffect(() => {
    clientRect();

    window.addEventListener('resize', clientRect);

    return () => {
      window.removeEventListener('resize', clientRect);
    };
  }, [canvasBaseRef.current]);

  return {
    canvasBaseRef,
    offsetWidth: canvasOffset.offsetWidth,
    offsetHeight: canvasOffset.offsetHeight,
    offsetLeft: canvasOffset.offsetLeft,
    offsetTop: canvasOffset.offsetTop,
  };
};
