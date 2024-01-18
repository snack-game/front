import styled from '@emotion/styled';

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

  return <StyledCanvas ref={canvasRef}></StyledCanvas>;
};

export default SnackRain;

const StyledCanvas = styled.canvas`
  position: fixed;
  width: 100vw;
  height: 100%;
`;
