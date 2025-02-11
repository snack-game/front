import { useEffect, useState } from 'react';

import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

import AppleGameView from './AppleGameView';
import GameResult from '../../components/GameResult';
import SnackGameHUD from '../../components/SnackGameHUD';
import Apple from '../../model/appleGame/apple';
import { AppleGame } from '../../model/appleGame/appleGame';
import PlainApple from '../../model/appleGame/plainApple';

const ClassicMode = () => {
  const setError = useError();
  const openToast = useToast();
  const { openModal } = useModal();

  const emptyGame = new AppleGame({ row: 0, column: 0, apples: [] });
  const defaultTime = 120;
  const defaultRows = 10;
  const defaultColumns = 18;

  const [appleGame, setAppleGame] = useState(emptyGame);
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(defaultTime);

  const generateApples = async () => {
    const apples = [];
    for (let i = 0; i < defaultRows; i++) {
      for (let j = 0; j < defaultColumns; j++) {
        apples.push(
          new PlainApple({
            coordinates: { y: i, x: j },
            appleNumber: Math.floor(Math.random() * 9) + 1,
          }),
        );
      }
    }
    return apples;
  };

  const startGame = async () => {
    try {
      setAppleGame(
        new AppleGame({
          row: defaultRows,
          column: defaultColumns,
          apples: await generateApples(),
        }),
      );
      setScore(0);
      setIsOngoing(true);
      setRemainingTime(defaultTime);
      openToast('게임 시작!', 'success');
    } catch (e) {
      setError(new Error('게임 시작에 실패했습니다.'));
    }
  };

  const onRemove = async (removedApples: Apple[]) => {
    setScore(appleGame.getScore());
  };

  const endGame = () => {
    try {
      setAppleGame(emptyGame);
      setIsOngoing(false);
      openToast('게임 종료!', 'success');

      openModal({
        children: (
          <GameResult score={score} percentile={0} reStart={startGame} />
        ),
      });
    } catch (e) {
      setError(new Error('게임 종료에 실패했습니다.'));
    }
  };

  const refreshGame = async () => {
    return await startGame();
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
    <>
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
    </>
  );
};

export default ClassicMode;
