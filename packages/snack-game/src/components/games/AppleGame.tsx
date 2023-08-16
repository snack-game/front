import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import Button from '@components/common/Button/Button';
import { Apple } from '@modules/apple-game/apple';
import { AppleGameManager } from '@modules/apple-game/appleGameManager';
import { Drag } from '@modules/apple-game/drag';

import { useGameStart } from '@hooks/queries/appleGame.query';
import useCanvas from '@hooks/useCanvas';

interface AppleGameProps {
  children?: never;
  clientWidth: number;
  clientHeight: number;
}

const AppleGame = ({ clientWidth, clientHeight }: AppleGameProps) => {
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [rect, setRect] = useState<DOMRect>();
  const { gameStart, error } = useGameStart();

  const drag: Drag = new Drag();
  const appleGameManager: AppleGameManager = new AppleGameManager();

  const animation = (ctx: CanvasRenderingContext2D) => {
    // background
    ctx.clearRect(0, 0, clientWidth, clientHeight);

    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(0, 0, clientWidth, clientHeight);

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

  const canvasRef = useCanvas({ clientWidth, clientHeight, animation });

  useEffect(() => {
    if (canvasRef.current) {
      setRect(canvasRef.current.getBoundingClientRect());
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

          if (isGolden) setApples(appleGameManager.generateApples(rect));
          break;
        }

        case 'mousemove': {
          drag.onMouseMove(event, rect);
          break;
        }
      }
    }
  };

  const handleStartButton = () => {
    if (rect) {
      gameStart();
      if (!error) {
        setApples(appleGameManager.generateApples(rect));
        setStart(true);
      }
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseEvent}
        onMouseMove={handleMouseEvent}
        onMouseUp={handleMouseEvent}
      ></canvas>
      <Button
        content={'시작!'}
        onClick={handleStartButton}
        show={!start}
        wrapper={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      />
    </>
  );
};

export default AppleGame;
