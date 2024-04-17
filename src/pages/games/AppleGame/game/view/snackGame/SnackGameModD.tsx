import { useEffect, useState } from 'react';

import GameResult from '@pages/games/AppleGame/components/GameResult';
import SnackGameHUD from '@pages/games/AppleGame/game/view/SnackGameHUD';

import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

import SnackGameView from './SnackGameView';
import { GoldenSnack } from '../../model/snackGame/goldSnack';
import NewPlainApple from '../../model/snackGame/plainSnack';
import NewApple from '../../model/snackGame/snack';
import { SnackGameD } from '../../model/snackGame/snackGameD';

const SnackGameModD = () => {
  const setError = useError();
  const openToast = useToast();
  const { openModal } = useModal();

  const emptyGame = new SnackGameD({ row: 0, column: 0, snacks: [] });
  const defaultTime = 120;
  const defaultRows = 10;
  const defaultColumns = 5;

  const [snackGame, setSnackGame] = useState(emptyGame);
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
            new GoldenSnack({
              coordinates: { y: i, x: j },
              snackNumber: Math.floor(Math.random() * 9) + 1,
              index,
            }),
          );
        } else {
          apples.push(
            new NewPlainApple({
              coordinates: { y: i, x: j },
              snackNumber: Math.floor(Math.random() * 9) + 1,
              index,
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
      setSnackGame(
        new SnackGameD({
          row: defaultRows,
          column: defaultColumns,
          snacks: await generateApples(),
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
    if (removedApples.some((apple) => apple instanceof GoldenSnack)) {
      const response = await generateApples();
      if (response) {
        snackGame.updateSnacks(response);
      }
    }

    setScore(snackGame.getScore());
  };

  const endGame = async () => {
    try {
      setSnackGame(emptyGame);
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
      <SnackGameHUD
        score={score}
        time={remainingTime}
        handleRefresh={refreshGame}
      />
      <SnackGameView
        isOngoing={isOngoing}
        startGame={startGame}
        onRemove={onRemove}
        snackGame={snackGame}
      />
    </>
  );
};

export default SnackGameModD;
