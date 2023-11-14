import { memo } from 'react';

import { AppleGameProps } from '@utils/types/game.type';

import useAppleGame from '@hooks/game/useAppleGame';

const AppleGame = ({
  offsetWidth,
  offsetHeight,
  offsetLeft,
  offsetTop,
  drag,
  appleGameManager,
}: AppleGameProps) => {
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    appleGameCanvasRef,
  } = useAppleGame({
    offsetWidth,
    offsetHeight,
    offsetLeft,
    offsetTop,
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
