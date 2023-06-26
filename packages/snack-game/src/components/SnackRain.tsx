import { FC } from 'react';

import { SnackRainManager } from '@modules/snack_rain_manager';

import useCanvas from '@hooks/useCanvas';

interface DropApplesProps {
  children?: never;
  clientWidth: number;
  clientHeight: number;
}

const SnackRain: FC<DropApplesProps> = ({ clientWidth, clientHeight }) => {
  const snackRain = new SnackRainManager();

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    snackRain.drawSnackRain(ctx, clientWidth, clientHeight);
  };

  const canvasRef = useCanvas(clientWidth, clientHeight, animate);

  return (
    <canvas ref={canvasRef} className={'w-screen h-full -z-10 fixed'}></canvas>
  );
};

export default SnackRain;
