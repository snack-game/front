import { useEffect, useState } from 'react';

import GameResult from '@pages/games/AppleGame/components/GameResult';
import AppleGameController from '@pages/games/AppleGame/game/controller/AppleGameController';
import { goldModAppleType } from '@pages/games/AppleGame/game/game.type';
import Apple from '@pages/games/AppleGame/game/model/apple';
import { AppleGame } from '@pages/games/AppleGame/game/model/appleGame';
import { GoldenApple } from '@pages/games/AppleGame/game/model/goldenApple';
import PlainApple from '@pages/games/AppleGame/game/model/plainApple';
import AppleGameHUD from '@pages/games/AppleGame/game/view/AppleGameHUD';

import useError from '@hooks/useError';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

const NewMode = () => {
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
    const totalApples = defaultRows * defaultColumns;

    const goldenAppleIndex = Math.floor(Math.random() * totalApples);

    let index = 0;

    for (let i = 0; i < defaultRows; i++) {
      for (let j = 0; j < defaultColumns; j++) {
        if (index === goldenAppleIndex) {
          apples.push(
            new GoldenApple({
              coordinates: { y: i, x: j },
              appleNumber: Math.floor(Math.random() * 9) + 1,
            }),
          );
        } else {
          apples.push(
            new PlainApple({
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
    if (removedApples.some((apple) => apple instanceof GoldenApple)) {
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
      <AppleGameController
        isOngoing={isOngoing}
        startGame={startGame}
        onRemove={onRemove}
        appleGame={appleGame}
      />
    </>
  );
};

export default NewMode;
