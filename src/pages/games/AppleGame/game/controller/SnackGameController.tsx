import { memo, useEffect, useMemo, useState } from 'react';

import Button from '@components/Button/Button';
import { Particle } from '@pages/games/AppleGame/game/model/particle';
import { MouseEventType } from '@utils/types/common.type';

import useCanvas from '@hooks/useCanvas';
import { useCanvasOffset } from '@hooks/useCanvasOffset';
import useError from '@hooks/useError';

import { Click } from '../model/click';
import NewApple from '../model/snack';
import { SnackGame } from '../model/snackGame';

interface AppleGameProps {
  isOngoing: boolean;
  appleGame: SnackGame;
  onRemove: (removedApples: NewApple[]) => Promise<void>;
  startGame?: () => Promise<void>;
}

interface EventListenerInfo {
  event: string;
  handler: any;
}

const SnackGameController = ({
  isOngoing,
  appleGame,
  onRemove,
  startGame,
}: AppleGameProps) => {
  const setError = useError();
  const { canvasBaseRef, offsetWidth, offsetHeight, offsetLeft, offsetTop } =
    useCanvasOffset();

  const click = useMemo(() => new Click(), []);
  const [fallingApples, setFallingApples] = useState<NewApple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const animationFrame = (ctx: CanvasRenderingContext2D) => {
    appleGame.getApples().forEach((apple) => {
      apple.drawApple(ctx);

      if (apple.getIsSelected()) apple.highlightBorder(ctx);
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
    click.onMouseDown(event, offsetLeft, offsetTop);

    const apples = appleGame.getApples();
    apples.forEach((apple) => {
      const { x, y } = click.getClickedPosition();
      if (apple.isClicked(x, y)) {
        apple.setIsSelected(true);
      }
    });
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
      { event: 'touchend', handler: handleMouseUp },
    ];

    if (canvasRef.current) {
      eventListeners.forEach((listener) =>
        canvasRef.current?.addEventListener(listener.event, listener.handler, {
          passive: false,
        }),
      );
      return () => {
        eventListeners.forEach((listener) =>
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
    <div ref={canvasBaseRef} className={'m-auto h-[80%] max-w-7xl bg-game'}>
      {isOngoing ? (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
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

export default memo(SnackGameController);
