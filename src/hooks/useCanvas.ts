import { RefObject, useEffect, useRef } from 'react';

interface useCanvasProps {
  animationFrame: (ctx: CanvasRenderingContext2D) => void;
  offsetWidth: number;
  offsetHeight: number;
}

const useCanvas = ({
  animationFrame,
  offsetWidth,
  offsetHeight,
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
        ctx.clearRect(0, 0, offsetWidth, offsetHeight);
        animationFrame(ctx);
      }
    };

    requestAnimation();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [offsetWidth, offsetHeight, animationFrame, canvasRef.current]);

  return canvasRef;
};

export default useCanvas;
