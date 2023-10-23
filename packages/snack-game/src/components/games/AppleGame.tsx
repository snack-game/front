import { memo } from 'react';

import { AppleGameProps } from '@utils/types/game.type';

import { useAppleGameLogic } from '@hooks/game/useAppleGame';

const AppleGame = ({
  offsetWidth,
  offsetHeight,
  offsetLeft,
  offsetTop,
  appleGameInfo,
  drag,
  appleGameManager,
}: AppleGameProps) => {
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    appleGameCanvasRef,
  } = useAppleGameLogic({
    offsetWidth,
    offsetHeight,
    offsetLeft,
    offsetTop,
    appleGameInfo,
    drag,
    appleGameManager,
  });

  return (
    <canvas
      ref={appleGameCanvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export default memo(AppleGame);
