import React, { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { Apple } from '@modules/apple-game/apple';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameState } from '@utils/atoms/game';
import { appleGameMoveType, appleGameStateType } from '@utils/types/game.type';

import useCanvas from '@hooks/useCanvas';

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
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const setAppleGameState = useSetRecoilState(appleGameState);

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

  const canvasRef = useCanvas({
    clientWidth,
    clientHeight,
    animation,
  });

  useEffect(() => {
    appleGameManager.updateApplePosition(clientWidth, clientHeight, apples);
  }, [canvasRef.current, clientWidth, clientHeight]);

  useEffect(() => {
    if (appleGameInfo) {
      setApples(
        appleGameManager.generateApples(
          clientWidth,
          clientHeight,
          appleGameInfo.apples,
        ),
      );
    }
  }, []);

  const handleMouseEvent = (event: React.MouseEvent<HTMLCanvasElement>) => {
    switch (event.type) {
      case 'mousedown': {
        drag.onMouseDown(event, clientLeft, clientTop);
        break;
      }

      case 'mouseup': {
        drag.onMouseUp();

        const { newApples, removedApples, isGolden, getScore, score } =
          appleGameManager.checkApplesInDragArea(
            apples,
            drag.startX,
            drag.startY,
            drag.currentX,
            drag.currentY,
          );

        if (getScore) {
          const removedAppleCoordinates: appleGameMoveType[] =
            removedApples.map((apple) => apple.coordinates);

          setAppleGameState((prev: appleGameStateType) => ({
            ...prev,
            score: prev.score + score,
            coordinates: [
              ...(prev.coordinates || []),
              { coordinates: removedAppleCoordinates },
            ],
          }));
        }

        setApples(newApples);
        setRemovedApples(removedApples);

        // if (isGolden) setApples(appleGameManager.generateApples(rect));
        break;
      }

      case 'mousemove': {
        drag.onMouseMove(event, clientLeft, clientTop);
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseEvent}
      onMouseMove={handleMouseEvent}
      onMouseUp={handleMouseEvent}
    ></canvas>
  );
};

export default AppleGame;
