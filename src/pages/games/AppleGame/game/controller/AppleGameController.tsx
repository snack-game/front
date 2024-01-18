import { memo, useEffect, useMemo, useState } from 'react';

import Button from '@components/Button/Button';
import Apple from '@pages/games/AppleGame/game/model/apple';
import { AppleGame } from '@pages/games/AppleGame/game/model/appleGame';
import { Drag } from '@pages/games/AppleGame/game/model/drag';
import { Particle } from '@pages/games/AppleGame/game/model/particle';
import { MouseEventType } from '@utils/types/common.type';

import useCanvas from '@hooks/useCanvas';
import { useCanvasOffset } from '@hooks/useCanvasOffset';
import useError from '@hooks/useError';

interface AppleGameProps {
  isOngoing: boolean;
  appleGame: AppleGame;
  onRemove: (removedApples: Apple[]) => Promise<void>;
  startGame?: () => Promise<void>;
}

interface EventListenerInfo {
  event: string;
  handler: any;
}

const AppleGameController = ({
  isOngoing,
  appleGame,
  onRemove,
  startGame,
}: AppleGameProps) => {
  const setError = useError();
  const { canvasBaseRef, offsetWidth, offsetHeight, offsetLeft, offsetTop } =
    useCanvasOffset();

  const drag = useMemo(() => new Drag(), []);
  const [fallingApples, setFallingApples] = useState<Apple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const animationFrame = (ctx: CanvasRenderingContext2D) => {
    const { x, y, width, height } = drag.getDragArea();
    const isDrawing = drag.getIsDrawing();

    if (isDrawing) drag.drawDragArea(ctx);

    appleGame.getApples().forEach((apple) => {
      apple.drawApple(ctx);

      if (isDrawing) apple.highlightBorder(ctx, x, y, width, height);
    });

    fallingApples.forEach((apple) => {
      apple.drawApple(ctx);
    });

    particles.forEach((it) => {
      it.update();
      it.drawParticle(ctx);
    });

    fallingApples.forEach((apple) => {
      const { x: velocityX, y: velocityY } = apple.getVelocity();
      const { x: positionX, y: positionY } = apple.getPosition();

      apple.setVelocity({ x: velocityX, y: velocityY - 0.5 });

      const newPositionX = positionX + velocityX;
      const newPositionY = positionY - velocityY;

      apple.setPosition({ x: newPositionX, y: newPositionY });

      if (positionY > apple.getRadius() * appleGame.getColumn() * 3) {
        setFallingApples([]);
        setParticles([]);
      }
    });
  };

  const canvasRef = useCanvas({
    offsetWidth,
    offsetHeight,
    animationFrame,
  });

  const handleMouseDown = (event: MouseEventType) => {
    event.preventDefault();
    drag.onMouseDown(event, offsetLeft, offsetTop);
  };

  const handleMouseMove = (event: MouseEventType) => {
    event.preventDefault();
    drag.onMouseMove(event, offsetLeft, offsetTop);
  };

  const handleMouseUp = async () => {
    try {
      const removedApples = appleGame.removeApples();
      setFallingApples((prev) => [...prev, ...removedApples]);
      removedApples.forEach((apple) => {
        for (let i = 0; i < 5; i++) {
          particles.push(
            new Particle(
              apple.getPosition().x + apple.getRadius(),
              apple.getPosition().y + apple.getRadius(),
            ),
          );
        }
      });
      await onRemove(removedApples);
      drag.onMouseUp();
      appleGame.updateApplePosition(offsetWidth, offsetHeight);
    } catch (e) {
      setError(new Error('이벤트가 실패했습니다.'));
    }
  };

  useEffect(() => {
    appleGame.updateApplePosition(offsetWidth, offsetHeight);
  }, [offsetWidth, offsetHeight, offsetLeft, offsetTop]);

  useEffect(() => {
    appleGame.updateApplePosition(offsetWidth, offsetHeight);
  }, [appleGame]);

  useEffect(() => {
    const eventListeners: EventListenerInfo[] = [
      { event: 'touchstart', handler: handleMouseDown },
      { event: 'touchmove', handler: handleMouseMove },
      { event: 'touchend', handler: handleMouseUp },
    ];

    if (canvasRef.current) {
      eventListeners.forEach(
        (listener) =>
          canvasRef.current?.addEventListener(
            listener.event,
            listener.handler,
            {
              passive: false,
            },
          ),
      );
      return () => {
        eventListeners.forEach(
          (listener) =>
            canvasRef.current?.removeEventListener(
              listener.event,
              listener.handler,
            ),
        );
      };
    }
  }, [
    canvasRef.current,
    appleGame,
    offsetWidth,
    offsetHeight,
    offsetLeft,
    offsetTop,
  ]);

  return (
    <div ref={canvasBaseRef} className={'bg-game m-auto h-[80%] max-w-7xl'}>
      {isOngoing ? (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Button onClick={startGame} size="lg">
            게임시작!
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(AppleGameController);
