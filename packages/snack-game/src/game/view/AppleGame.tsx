import { memo, useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '@components/common/Button/Button';
import GameResult from '@components/ui/GameResult/GameResult';
import { ClassicModController } from '@game/controller/classicModController';
import { GoldModController } from '@game/controller/goldModController';
import { PlayGroundModeController } from '@game/controller/playGroundModeController';
import { AppleData, scoredAppleRectType } from '@game/game.type';
import AppleGameHUD from '@game/view/AppleGameHUD';
import { MouseEventType } from '@utils/types/common.type';

import { TOAST_MESSAGE } from '@constants/toast.constant';
import useCanvas from '@hooks/useCanvas';
import { useCanvasOffset } from '@hooks/useCanvasOffset';
import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

type ServedAppleData = Promise<AppleData[][]> | AppleData[][];

type GameMode =
  | GoldModController
  | ClassicModController
  | PlayGroundModeController;

interface AppleGameProps {
  gameMode: string;
  startLogic: () => ServedAppleData;
  endLogic?: (rect: scoredAppleRectType[]) => void;
  refreshLogic: () => ServedAppleData;
  time?: number;
  sessionId?: number;
  row?: number;
  column?: number;
}

const AppleGame = ({
  gameMode = 'gold',
  startLogic,
  endLogic,
  refreshLogic,
  time = 20,
  sessionId = 0,
  row = 10,
  column = 12,
}: AppleGameProps) => {
  const [start, setStart] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const setError = useError();

  const openToast = useToast();
  const { openModal } = useModal();
  const { canvasBaseRef, offsetWidth, offsetHeight, offsetLeft, offsetTop } =
    useCanvasOffset();

  const gameController: GameMode = useMemo(() => {
    switch (gameMode) {
      case 'gold':
        return new GoldModController({ row, column, sessionId });
      case 'classic':
        return new ClassicModController({ row, column });
      case 'practice':
        return new PlayGroundModeController({ row, column });
      default:
        return new GoldModController({ row, column, sessionId });
    }
  }, [gameMode, row, column]);

  const animationFrame = gameController.animationFrame.bind(gameController);

  const canvasRef = useCanvas({
    offsetWidth,
    offsetHeight,
    animationFrame,
  });

  const generateApples = async () => {
    const apples = await startLogic();
    gameController.generateApples(apples);
    gameController.updateApplePosition(offsetWidth, offsetHeight);
  };

  const handleStartButton = async () => {
    try {
      await generateApples();
      setStart(true);
      setTimeRemaining(time);
      openToast(TOAST_MESSAGE.GAME_START, 'success');
    } catch (e) {
      setError(new Error('게임 시작에 실패했습니다.'));
    }
  };

  const handleGameEnd = () => {
    try {
      setStart(false);
      openToast(TOAST_MESSAGE.GAME_END, 'success');

      openModal({
        children: <GameResult score={score} reStart={handleStartButton} />,
      });

      if (gameController instanceof GoldModController) {
        if (endLogic) {
          endLogic(gameController.getScoredAppleRect());
          gameController.resetGameState();
        }
      }
    } catch (e) {
      setError(new Error('게임 종료에 실패했습니다.'));
    }
  };

  const handleRefresh = async () => {
    try {
      gameController.resetGameState();
      gameController.generateApples(await refreshLogic());
      gameController.updateApplePosition(offsetWidth, offsetHeight);
      setTimeRemaining(time);
    } catch (e) {
      setError(new Error('새로고침에 실패했습니다.'));
    }
  };

  const handleMouseDown = (event: MouseEventType) => {
    gameController.handleMouseDown(event, offsetLeft, offsetTop);
  };

  const handleMouseMove = (event: MouseEventType) => {
    gameController.handleMouseMove(event, offsetLeft, offsetTop);
  };

  const handleMouseUp = async () => {
    try {
      await gameController.handleMouseUp();
      gameController.updateApplePosition(offsetWidth, offsetHeight);
      setScore(gameController.getScore());
    } catch (e) {
      setError(new Error('이벤트가 실패했습니다.'));
    }
  };

  useEffect(() => {
    gameController.updateApplePosition(offsetWidth, offsetHeight);
  }, [offsetWidth, offsetHeight, offsetLeft, offsetTop]);

  useEffect(() => {
    if (start) {
      generateApples();
    }
  }, [row, column]);

  useEffect(() => {
    setTimeRemaining(time);
  }, [time]);

  useEffect(() => {
    if (gameController instanceof GoldModController) {
      gameController.setSessionId(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (start && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((preTime) => preTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    } else if (timeRemaining === 0 && start) {
      handleGameEnd();
    }
  }, [start, timeRemaining]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.addEventListener('touchstart', handleMouseDown, {
        passive: false,
      });
      canvasRef.current.addEventListener('touchmove', handleMouseMove, {
        passive: false,
      });
      canvasRef.current.addEventListener('touchend', handleMouseUp);

      return () => {
        canvasRef.current?.removeEventListener(
          'touchstart',
          () => handleMouseDown,
        );
        canvasRef.current?.removeEventListener(
          'touchmove',
          () => handleMouseMove,
        );
        canvasRef.current?.removeEventListener(
          'touchend',
          () => handleMouseMove,
        );
      };
    }
  }, [canvasRef.current]);

  return (
    <>
      <AppleGameHUD
        score={score}
        time={timeRemaining}
        handleRefresh={handleRefresh}
      />
      <AppleGameWrapper ref={canvasBaseRef}>
        {start ? (
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
        ) : (
          <Button
            content={'시작!'}
            onClick={handleStartButton}
            wrapper={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          />
        )}
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

export default memo(AppleGame);
