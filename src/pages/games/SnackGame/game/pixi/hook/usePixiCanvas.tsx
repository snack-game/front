import { RefObject, useEffect, useRef } from 'react';

import { app } from '../SnackGameBase';

interface usePixiCanvasProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

const usePixiCanvas = ({ canvasBaseRef }: usePixiCanvasProps) => {
  useEffect(() => {
    initCanvas();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const initCanvas = async () => {
    await app.init({
      resolution: Math.max(window.devicePixelRatio, 2),
      backgroundColor: 0xffffff,
    });

    canvasBaseRef.current?.appendChild(app.canvas);

    window.addEventListener('resize', resize);

    resize();
  };

  const resize = () => {
    if (canvasBaseRef.current) {
      const width = canvasBaseRef.current.offsetWidth;
      const height = canvasBaseRef.current.offsetHeight;

      // Update canvas style dimensions to fill the div
      app.canvas.style.width = `${width}px`;
      app.canvas.style.height = `${height}px`;

      // Update renderer dimensions
      app.renderer.resize(width, height);
    }
  };
};

export default usePixiCanvas;
