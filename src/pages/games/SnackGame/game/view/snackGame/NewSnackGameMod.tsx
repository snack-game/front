import { useEffect, useState } from 'react';

import GameResult from '@pages/games/SnackGame/game/components/GameResult';
import SnackGameHUD from '@pages/games/SnackGame/game/components/SnackGameHUD';

import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

import SnackGameView from './SnackGameView';
import { GameStart } from '../../components/GameStart';
import { SnackGameMod } from '../../game.type';
import { GoldenSnack } from '../../model/snackGame/goldSnack';
import NewPlainApple from '../../model/snackGame/plainSnack';
import NewApple from '../../model/snackGame/snack';
import { SnackGame } from '../../model/snackGame/snackGame';
import { SnackGameC } from '../../model/snackGame/snackGameInf';
import { SnackGameD } from '../../model/snackGame/snackGameMobile';

const snackGameMods = {
  default: SnackGameD,
  inf: SnackGameC,
};

const NewSnackGameMod = () => {
  const setError = useError();
  const openToast = useToast();
  const { openModal } = useModal();

  const defaultTime = 120;
  const defaultRows = 8;
  const defaultColumns = 5;

  const [snackGameMod, setSnackGameMod] = useState<SnackGameMod>('default');
  const [snackGame, setSnackGame] = useState<SnackGame | null>(null);
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

  const startGame = async (snackGameMod: SnackGameMod) => {
    setSnackGameMod(snackGameMod);

    try {
      setSnackGame(
        new snackGameMods[snackGameMod]({
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
    try {
      if (!snackGame) throw Error;

      if (removedApples.some((apple) => apple instanceof GoldenSnack)) {
        const response = await generateApples();
        if (response) {
          snackGame.updateSnacks(response);
        }
      }

      setScore(snackGame.getScore());
    } catch (e) {
      setError(new Error('게임 진행 중 오류가 발생했습니다.'));
    }
  };

  const endGame = async () => {
    try {
      setSnackGame(null);
      setIsOngoing(false);
      openToast('게임 종료!', 'success');

      openModal({
        children: (
          <GameResult score={score} reStart={() => startGame(snackGameMod)} />
        ),
      });
    } catch (e) {
      setError(new Error('게임 종료에 실패했습니다.'));
    }
  };

  const refreshGame = async () => {
    return await startGame(snackGameMod);
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
    <div className="flex h-full w-full flex-col">
      {isOngoing && (
        <SnackGameHUD
          score={score}
          time={remainingTime}
          handleRefresh={refreshGame}
        />
      )}
      {snackGame && (
        <SnackGameView
          isOngoing={isOngoing}
          onRemove={onRemove}
          snackGame={snackGame}
        />
      )}
      {!isOngoing && <GameStart startGame={startGame} />}
    </div>
  );
};

export default NewSnackGameMod;
