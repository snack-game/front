import styled from '@emotion/styled';

import { SnackRainManager } from '@modules/snackRainManager';

import useCanvas from '@hooks/useCanvas';

interface DropApplesProps {
  clientWidth: number;
  clientHeight: number;
}

const SnackRain = ({ clientWidth, clientHeight }: DropApplesProps) => {
  const snackRain = new SnackRainManager();

  const animation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    snackRain.drawSnackRain(ctx, clientWidth, clientHeight);
  };

  const canvasRef = useCanvas({ clientWidth, clientHeight, animation });

  return <StyledCanvas ref={canvasRef}></StyledCanvas>;
};

export default SnackRain;

const StyledCanvas = styled.canvas`
  position: fixed;
  width: 100vw;
  height: 100%;
`;
