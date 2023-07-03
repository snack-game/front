import React, { FC, useEffect, useState } from 'react';

import Button from '@components/common/Button';
import { Apple } from '@modules/game/apple';
import { AppleGameManager } from '@modules/game/apple_game_manager';
import { Drag } from '@modules/game/drag';

import useCanvas from '@hooks/useCanvas';

interface AppleGameProps {
  children?: never;
  clientWidth: number;
  clientHeight: number;
}

const AppleGame: FC<AppleGameProps> = ({ clientWidth, clientHeight }) => {
  const [apples, setApples] = useState<Apple[]>([]);
  const [removedApples, setRemovedApples] = useState<Apple[]>([]);
  const [score, setScore] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [rect, setRect] = useState<DOMRect>();

  const drag: Drag = new Drag();
  const appleGameManager: AppleGameManager = new AppleGameManager();

  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(0, 0, clientWidth, clientHeight);
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    fillBackground(ctx);
    drag.drawDragArea(ctx);

    if (rect) {
      apples.forEach((apple: Apple) => {
        apple.handleAppleRendering(
          ctx,
          rect.height,
          drag.startX,
          drag.startY,
          drag.currentX,
          drag.currentY,
          drag.isDrawing,
        );
      });

      removedApples.forEach((apple: Apple) => {
        apple.updateFallingPosition(ctx, rect.height);
        if (apple.remove) {
          setRemovedApples([]);
        }
      });
    }
  };

  const canvasRef = useCanvas(clientWidth, clientHeight, animate);

  useEffect(() => {
    if (canvasRef.current) {
      setRect(canvasRef.current.getBoundingClientRect());
    }
  }, [canvasRef.current]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (rect) {
      drag.onMouseDown(event, rect);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (rect) {
      drag.onMouseMove(event, rect);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
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

    if (rect && isGolden) setApples(appleGameManager.generateApples(rect));
  };

  const handleStartButton = () => {
    if (rect) {
      setApples(appleGameManager.generateApples(rect));
      setStart(true);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <Button
        content={'시작!'}
        onClick={handleStartButton}
        className={`absolute top-1/2 mx-auto left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          start ? 'hidden' : ''
        }`}
      />
    </>
  );
};

export default AppleGame;
