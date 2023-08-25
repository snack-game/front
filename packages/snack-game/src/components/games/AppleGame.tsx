import React, { useEffect, useState } from 'react';

import { Apple } from '@modules/apple-game/apple';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';
import { appleGameStateType } from '@utils/types/game.type';

import useCanvas from '@hooks/useCanvas';

interface AppleGameProps {
  clientWidth: number;
  clientHeight: number;
  appleGameState?: appleGameStateType;
}

const AppleGame = ({
  clientWidth,
  clientHeight,
  appleGameState,
}: AppleGameProps) => {
  const drag: Drag = new Drag();
  const appleGameManager: AppleGameManager = new AppleGameManager();

  const [rect, setRect] = useState<DOMRect>();
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);

  const animation = (ctx: CanvasRenderingContext2D) => {
    // background
    ctx.clearRect(0, 0, clientWidth, clientHeight);

    // ctx.fillStyle = '#ffedd5';
    // ctx.fillRect(0, 0, clientWidth, clientHeight);

    drag.drawDragArea(ctx);

    // render game
    if (rect) {
      apples.forEach((apple: Apple) => {
        appleGameManager.handleAppleRendering(
          ctx,
          rect.height,
          drag.startX,
          drag.startY,
          drag.currentX,
          drag.currentY,
          drag.isDrawing,
          apple,
        );
      });

      removedApples.forEach((apple: Apple) => {
        appleGameManager.updateFallingPosition(ctx, rect.height, apple);
        if (apple.remove) {
          setRemovedApples([]);
        }
      });
    }
  };

  const canvasRef = useCanvas({
    clientWidth,
    clientHeight,
    animation,
  });

  useEffect(() => {
    setRect(canvasRef.current?.getBoundingClientRect());

    if (rect && appleGameState) {
      setApples(appleGameManager.generateApples(rect, appleGameState.apples));
    }
  }, [canvasRef.current]);

  const handleMouseEvent = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (rect) {
      switch (event.type) {
        case 'mousedown': {
          drag.onMouseDown(event, rect);
          break;
        }

        case 'mouseup': {
          drag.onMouseUp();

          const { newApples, removedApples, isGolden } =
            appleGameManager.checkApplesInDragArea(
              apples,
              drag.startX,
              drag.startY,
              drag.currentX,
              drag.currentY,
            );

          setApples(newApples);
          setRemovedApples(removedApples);

          // if (isGolden) setApples(appleGameManager.generateApples(rect));
          break;
        }

        case 'mousemove': {
          drag.onMouseMove(event, rect);
          break;
        }
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
