import { RefObject, useEffect, useRef } from 'react';

interface useCanvasProps {
  clientWidth: number;
  clientHeight: number;
  animation: (ctx: CanvasRenderingContext2D) => void;
}

const useCanvas = ({
  clientWidth,
  clientHeight,
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
        canvas.style.width = clientWidth + 'px';
        canvas.style.height = clientHeight + 'px';

        canvas.width = clientWidth * devicePixelRatio;
        canvas.height = clientHeight * devicePixelRatio;

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
  }, [clientWidth, clientHeight, animation, canvasRef.current]);

  return canvasRef;
};

export default useCanvas;
