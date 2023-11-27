import { memo } from 'react';

import { AppleGameProps } from '@utils/types/game.type';

import useAppleGame from '@hooks/game/useAppleGame';

const AppleGame = ({ drag, gameRenderer, gameManager }: AppleGameProps) => {
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    appleGameCanvasRef,
  } = useAppleGame({
    drag,
    gameRenderer,
    gameManager: gameManager,
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
