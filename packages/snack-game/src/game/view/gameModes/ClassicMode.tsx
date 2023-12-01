import { AppleData } from '@game/game.type';
import AppleGame from '@game/view/AppleGame';

const ClassicMode = () => {
  const startLogic = (): AppleData[][] => {
    const apples = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 18; j++) {
        row.push({ number: Math.floor(Math.random() * 9) + 1 });
      }
      apples.push(row);
    }

    return apples;
  };

  const refreshLogic = (): AppleData[][] => {
    return startLogic();
  };

  return (
    <AppleGame
      startLogic={startLogic}
      refreshLogic={refreshLogic}
      gameMode={'classic'}
      column={18}
    />
  );
};

export default ClassicMode;
