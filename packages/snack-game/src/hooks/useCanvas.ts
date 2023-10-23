import { RefObject, useEffect, useRef } from 'react';

interface useCanvasProps {
  offsetWidth: number;
  offsetHeight: number;
  animation: (ctx: CanvasRenderingContext2D) => void;
}

const useCanvas = ({
  offsetWidth,
  offsetHeight,
  animation,
}: useCanvasProps) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canvas && ctx) {
        canvas.style.width = offsetWidth + 'px';
        canvas.style.height = offsetHeight + 'px';

        canvas.width = offsetWidth * devicePixelRatio;
        canvas.height = offsetHeight * devicePixelRatio;

        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    };

    setCanvas();

    let requestId: number;
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);

      if (ctx) {
        animation(ctx);
      }
    };

    requestAnimation();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [offsetWidth, offsetHeight, animation, canvasRef.current]);

  return canvasRef;
};

export default useCanvas;
