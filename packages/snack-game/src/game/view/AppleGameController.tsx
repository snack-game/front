import {memo, ReactNode, useEffect, useMemo, useState} from 'react';
import styled from '@emotion/styled';
import {AppleGame} from '@game/model/appleGame';
import {MouseEventType} from '@utils/types/common.type';

import useCanvas from '@hooks/useCanvas';
import {useCanvasOffset} from '@hooks/useCanvasOffset';
import useError from '@hooks/useError';
import {Drag} from "@game/model/drag";
import Apple from "@game/model/apple";
import {Particle} from "@game/model/particle";

interface AppleGameProps {
  isOngoing: boolean,
  appleGame: AppleGame,
  onRemove: (removedApples: Apple[]) => Promise<void>,
  startButton: ReactNode
}

interface EventListenerInfo {
  event: string,
  handler: any,
}

const AppleGameController = ({
                               isOngoing,
                               appleGame,
                               onRemove,
                               startButton
                             }: AppleGameProps) => {
  const setError = useError();

  const {canvasBaseRef, offsetWidth, offsetHeight, offsetLeft, offsetTop} = useCanvasOffset();

  const drag = useMemo(() => new Drag(), []);
  const [fallingApples, setFallingApples] = useState<Apple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const eventListeners = useMemo<EventListenerInfo[]>(() => [], []);

  const animationFrame = (ctx: CanvasRenderingContext2D) => {
    const {x, y, width, height} = drag.getDragArea();
    const isDrawing = drag.getIsDrawing();

    if (isDrawing) drag.drawDragArea(ctx);

    appleGame.getApples().forEach(apple => {
      apple.drawApple(ctx);

      if (isDrawing) apple.highlightBorder(ctx, x, y, width, height);
    });

    fallingApples.forEach(apple => {
      apple.drawApple(ctx);
    });

    particles.forEach(it => {
      it.update();
      it.drawParticle(ctx);
    });

    fallingApples.forEach((apple) => {
      const {x: velocityX, y: velocityY} = apple.getVelocity();
      const {x: positionX, y: positionY} = apple.getPosition();

      apple.setVelocity({x: velocityX, y: velocityY - 0.5});

      const newPositionX = positionX + velocityX;
      const newPositionY = positionY - velocityY;

      apple.setPosition({x: newPositionX, y: newPositionY});

      if (positionY > apple.getRadius() * appleGame.getColumn() * 3) {
        setFallingApples([]);
        setParticles([]);
      }
    });
  }

  const canvasRef = useCanvas({
    offsetWidth,
    offsetHeight,
    animationFrame
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
      setFallingApples(prev => [...prev, ...removedApples]);
      removedApples.forEach(apple => {
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
    if (canvasRef.current) {
      eventListeners.push(
        {event: 'touchstart', handler: handleMouseDown},
        {event: 'touchmove', handler: handleMouseMove},
        {event: 'touchend', handler: handleMouseUp}
      );
      eventListeners.forEach(it =>
        canvasRef.current?.addEventListener(it.event, it.handler, {passive: false})
      );
      return () => {
        eventListeners.forEach(it =>
          canvasRef.current?.removeEventListener(it.event, it.handler)
        );
        eventListeners.length = 0;
      };
    }
  }, [canvasRef.current, appleGame]);


  return (
    <>
      <AppleGameWrapper ref={canvasBaseRef}>
        {
          isOngoing ?
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            ></canvas>
            : startButton
        }
      </AppleGameWrapper>
    </>
  );
};

const AppleGameWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    background-color: ${(props) => props.theme.colors.appleGameBackground};
    width: 80%;
    height: 80vh;

    @media (max-width: 900px) {
        width: 100%;
        height: 90vh;
    }
`;

export default memo(AppleGameController);
