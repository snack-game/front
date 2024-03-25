import { useEffect, useState } from 'react';

import GameResult from '@pages/games/AppleGame/components/GameResult';
import AppleGameHUD from '@pages/games/AppleGame/game/view/AppleGameHUD';

import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

import NewGameModeController from '../controller/NewGameModeController';
import NewApple from '../model/newApple';
import { NewAppleGame } from '../model/newAppleGame';
import { NewGoldenApple } from '../model/newGoldApple';
import NewPlainApple from '../model/newPlainApple';

const NewMode = () => {
  const setError = useError();
  const openToast = useToast();
  const { openModal } = useModal();

  const emptyGame = new NewAppleGame({ row: 0, column: 0, apples: [] });
  const defaultTime = 120;
  const defaultRows = 10;
  const defaultColumns = 5;

  const [appleGame, setAppleGame] = useState(emptyGame);
  const [isOngoing, setIsOngoing] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(defaultTime);

  const generateApples = async () => {
    const apples = [];
    const totalApples = defaultRows * defaultColumns;

    const goldenAppleIndex = Math.floor(Math.random() * totalApples);

    let index = 0;

    for (let i = 0; i < defaultRows; i++) {
      for (let j = 0; j < defaultColumns; j++) {
        if (index === goldenAppleIndex) {
          apples.push(
            new NewGoldenApple({
              coordinates: { y: i, x: j },
              appleNumber: Math.floor(Math.random() * 9) + 1,
            }),
          );
        } else {
          apples.push(
            new NewPlainApple({
              coordinates: { y: i, x: j },
              appleNumber: Math.floor(Math.random() * 9) + 1,
            }),
          );
        }
        index++;
      }
    }
    return apples;
  };

  const startGame = async () => {
    try {
      setAppleGame(
        new NewAppleGame({
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

  const onRemove = async (removedApples: NewApple[]) => {
    if (removedApples.some((apple) => apple instanceof NewGoldenApple)) {
      const response = await generateApples();
      if (response) {
        appleGame.updateApples(response);
      }
    }

    setScore(appleGame.getScore());
  };

  const endGame = async () => {
    try {
      setAppleGame(emptyGame);
      setIsOngoing(false);
      openToast('게임 종료!', 'success');

      openModal({
        children: <GameResult score={score} reStart={startGame} />,
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
      <AppleGameHUD
        score={score}
        time={remainingTime}
        handleRefresh={refreshGame}
      />
      <NewGameModeController
        isOngoing={isOngoing}
        startGame={startGame}
        onRemove={onRemove}
        appleGame={appleGame}
      />
    </>
  );
};

export default NewMode;
