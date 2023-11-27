import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { SnackRainManager } from '@modules/snackRainManager';
import { setAppleGameOffsetState } from '@utils/atoms/game.atom';

import useCanvas from '@hooks/useCanvas';

const SnackRain = () => {
  const { offsetWidth, offsetHeight } = useRecoilValue(setAppleGameOffsetState);

  const snackRain = new SnackRainManager();

  const animation = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, offsetWidth, offsetHeight);
    snackRain.drawSnackRain(ctx, offsetWidth, offsetHeight);
  };

  const canvasRef = useCanvas({ offsetWidth, offsetHeight, animation });

  return <StyledCanvas ref={canvasRef}></StyledCanvas>;
};

export default SnackRain;

const StyledCanvas = styled.canvas`
  position: fixed;
  width: 100vw;
  height: 100%;
`;
