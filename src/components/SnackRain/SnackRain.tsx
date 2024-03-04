import { SnackRainManager } from '@utils/snackRainManager';

import useCanvas from '@hooks/useCanvas';

interface SnackRainProps {
  offsetWidth: number;
  offsetHeight: number;
}

const SnackRain = ({ offsetWidth, offsetHeight }: SnackRainProps) => {
  const snackRain = new SnackRainManager();

  const animationFrame = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, offsetWidth, offsetHeight);
    snackRain.drawSnackRain(ctx, offsetWidth, offsetHeight);
  };

  const canvasRef = useCanvas({ offsetWidth, offsetHeight, animationFrame });

  return <canvas ref={canvasRef} className='fixed w-screen h-full'></canvas>;
};

export default SnackRain;