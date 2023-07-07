import { FC } from 'react';

import styled from '@emotion/styled';

import { SnackRainManager } from '@modules/snackRainManager';

import useCanvas from '@hooks/useCanvas';

interface DropApplesProps {
  children?: never;
  clientWidth: number;
  clientHeight: number;
}

const StyledCanvas = styled.canvas`
  position: fixed;
  width: 100vw;
  height: 100%;
`;

const SnackRain: FC<DropApplesProps> = ({ clientWidth, clientHeight }) => {
  const snackRain = new SnackRainManager();

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    snackRain.drawSnackRain(ctx, clientWidth, clientHeight);
  };

  const canvasRef = useCanvas(clientWidth, clientHeight, animate);

  return <StyledCanvas ref={canvasRef}></StyledCanvas>;
};

export default SnackRain;
