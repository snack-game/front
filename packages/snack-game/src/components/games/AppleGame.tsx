import React from 'react';

import { Apple } from '@modules/apple-game/apple';
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
  const animation = (ctx: CanvasRenderingContext2D) => {
    // background
    ctx.clearRect(0, 0, clientWidth, clientHeight);

    drag.drawDragArea(ctx);

    // render game
    apples.forEach((apple: Apple) => {
      appleGameManager.handleAppleRendering(
        ctx,
        drag.startX,
        drag.startY,
        drag.currentX,
        drag.currentY,
        drag.isDrawing,
        apple,
      );
    });

    removedApples.forEach((removedApple: Apple) => {
      appleGameManager.updateFallingPosition(ctx, clientHeight, removedApple);
      if (removedApple.remove) {
        setRemovedApples([]);
      }
    });
  };

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setRemovedApples,
    removedApples,
    apples,
    appleGameCanvasRef,
  } = useAppleGameLogic({
    clientWidth,
    clientHeight,
    clientLeft,
    clientTop,
    appleGameInfo,
    drag,
    appleGameManager,
    animation,
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
