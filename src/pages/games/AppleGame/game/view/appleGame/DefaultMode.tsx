import { useEffect, useState } from 'react';

import QueryBoundary from '@components/base/QueryBoundary';
import retryError from '@components/Error/RetryError';
import GameResult from '@pages/games/AppleGame/components/GameResult';
import {
  goldModAppleType,
  scoredAppleRectType,
} from '@pages/games/AppleGame/game/game.type';
import Apple from '@pages/games/AppleGame/game/model/apple';
import { AppleGame } from '@pages/games/AppleGame/game/model/appleGame';
import { GoldenApple } from '@pages/games/AppleGame/game/model/goldenApple';
import PlainApple from '@pages/games/AppleGame/game/model/plainApple';
import SnackGameHUD from '@pages/games/AppleGame/game/view/SnackGameHUD';

import {
  useAppleGameRefresh,
  useAppleGameSessionEnd,
  useGoldModeCheck,
  useGoldModeStart,
} from '@hooks/queries/appleGame.query';
import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

import AppleGameView from './AppleGameView';

const DefaultMode = () => {
  const setError = useError();
  const openToast = useToast();
  const { openModal } = useModal();

  const { gameStart } = useGoldModeStart();
  const { checkMoves } = useGoldModeCheck();
  const { gameEnd } = useAppleGameSessionEnd();
  const gameRefresh = useAppleGameRefresh();

  const [sessionId, setSessionId] = useState(0);
  const [removedRects, setRemovedRects] = useState<scoredAppleRectType[]>([]);

  const emptyGame = new AppleGame({ row: 0, column: 0, apples: [] });
  const defaultTime = 120;

  const [appleGame, setAppleGame] = useState(emptyGame);
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(defaultTime);

  const startGame = async () => {
    try {
      const { apples, sessionId } = await gameStart();
      setSessionId(sessionId);
      setAppleGame(mapToAppleGame(apples));

      resetGameStates();
      setIsOngoing(true);
      openToast('게임 시작!', 'success');
    } catch (e) {
      setError(new Error('게임 시작에 실패했습니다.'));
    }
  };

  const onRemove = async (removedApples: Apple[]) => {
    if (removedApples.length) {
      removedRects.push(getRectFor(removedApples));
    }

    if (removedApples.some((apple) => apple instanceof GoldenApple)) {
      const response = await checkMoves(sessionId, removedRects);
      if (response) {
        appleGame.updateApples(mapApples(response.apples));
      }
      removedRects.length = 0;
    }

    setScore(appleGame.getScore());
  };

  const endGame = async () => {
    try {
      await checkMoves(sessionId, removedRects);
      const { percentile } = await gameEnd.mutateAsync(sessionId);

      setAppleGame(emptyGame);
      setIsOngoing(false);

      openToast('게임 종료!', 'success');
      openModal({
        children: (
          <GameResult
            score={score}
            percentile={percentile}
            reStart={startGame}
          />
        ),
      });
    } catch (e) {
      setError(new Error('게임 종료에 실패했습니다.'));
    }
  };

  const refreshGame = async () => {
    if (isOngoing) {
      const { apples } = await gameRefresh.mutateAsync(sessionId);
      setAppleGame(mapToAppleGame(apples));

      resetGameStates();
      setIsOngoing(true);
    }
  };

  const resetGameStates = () => {
    setRemovedRects([]);
    setRemainingTime(defaultTime);
    setScore(0);
  };

  const mapToAppleGame = (apples: goldModAppleType[][]) =>
    new AppleGame({
      row: apples.length,
      column: apples[0].length,
      apples: mapApples(apples),
    });

  const mapApples = (appleDatas: goldModAppleType[][]) =>
    appleDatas.flatMap((row, i) =>
      row.map((apple, j) => mapApple(i, j, apple)),
    );

  const mapApple = (y: number, x: number, appleData: goldModAppleType) => {
    const prop = {
      coordinates: { y: y, x: x },
      appleNumber: appleData.number,
    };
    if (appleData.golden) {
      return new GoldenApple(prop);
    }
    return new PlainApple(prop);
  };

  const getRectFor = (removedApples: Apple[]) => {
    const yCoordinates = removedApples.map((it) => it.getCoordinates().y);
    const xCoordinates = removedApples.map((it) => it.getCoordinates().x);
    const topLeft = {
      y: yCoordinates.reduce((one, other) => Math.min(one, other)),
      x: xCoordinates.reduce((one, other) => Math.min(one, other)),
    };
    const bottomRight = {
      y: yCoordinates.reduce((one, other) => Math.max(one, other)),
      x: xCoordinates.reduce((one, other) => Math.max(one, other)),
    };
    return { topLeft, bottomRight };
  };

  useEffect(() => {
    if (isOngoing && remainingTime > 0) {
      const timerId = setTimeout(() => {
        setRemainingTime((preTime) => preTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (isOngoing && remainingTime === 0) {
      endGame();
    }
  }, [isOngoing, remainingTime]);

  return (
    <QueryBoundary errorFallback={retryError}>
      <SnackGameHUD
        score={score}
        time={remainingTime}
        handleRefresh={refreshGame}
      />
      <AppleGameView
        isOngoing={isOngoing}
        startGame={startGame}
        onRemove={onRemove}
        appleGame={appleGame}
      />
    </QueryBoundary>
  );
};

export default DefaultMode;
