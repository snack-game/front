import React, { FC, useEffect, useState } from 'react';

import Button from '@components/common/Button';
import { Apple } from '@modules/game/apple';
import { Drag } from '@modules/game/drag';

import useCanvas from '@hooks/useCanvas';

interface AppleGameProps {
  children?: never;
  clientWidth: number;
  clientHeight: number;
}

const AppleGame: FC<AppleGameProps> = ({ clientWidth, clientHeight }) => {
  const [apples, setApples] = useState<Apple[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [rect, setRect] = useState<DOMRect>();

  const drag: Drag = new Drag();

  const generateApples = (rect: DOMRect): void => {
    if (rect) {
      const units = [];

      const rows = 10;
      const columns = 18;

      const borderOffset = 30;

      const availableWidth = (rect.width - borderOffset * 2) / columns;
      const availableHeight = (rect.height - borderOffset * 2) / rows;

      const appleRadius = Math.min(availableWidth, availableHeight) * 0.4;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const x =
            j * availableWidth +
            availableWidth / 2 -
            appleRadius +
            borderOffset;
          const y =
            i * availableHeight +
            availableHeight / 2 -
            appleRadius +
            borderOffset;
          const apple = new Apple(x, y, appleRadius, 1, 0.4, 0.5, {
            x: Math.random() * 4 - 2,
            y: 0,
          });
          units.push(apple);
        }
      }
      setApples(units);
    }
  };

  const fillBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(31, 31, 36)';
    ctx.fillRect(0, 0, clientWidth, clientHeight);
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    fillBackground(ctx);
    drag.drawDragArea(ctx);

    apples.forEach((apple) => {
      apple.drawApple(ctx);
    });
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
    drag.onMouseUp(() => {
      console.log('Mouse up');
    });
  };

  const handleStartButton = () => {
    if (rect) {
      generateApples(rect);
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
