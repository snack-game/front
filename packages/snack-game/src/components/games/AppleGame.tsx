import React from 'react';

import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameStateType } from '@utils/types/game.type';

import { useAppleGameLogic } from '@hooks/game/useAppleGame';

interface AppleGameProps {
  clientWidth: number;
  clientHeight: number;
  clientLeft: number;
  clientTop: number;
  appleGameInfo?: appleGameStateType;
  drag: Drag;
  appleGameManager: AppleGameManager;
}

const AppleGame = ({
  clientWidth,
  clientHeight,
  clientLeft,
  clientTop,
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
    clientWidth,
    clientHeight,
    clientLeft,
    clientTop,
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

export default AppleGame;
