import DefaultModIcon from '@assets/images/defaultmod.png';
import InfModIcon from '@assets/images/infmod.png';

import { SnackGameMod } from '../../game.type';

interface GameStartProps {
  startGame: (snackGameMod: SnackGameMod) => Promise<void>;
}

export const GameStart = ({ startGame }: GameStartProps) => {
  return (
    <div className="mx-auto mb-20 flex h-[75%] w-full max-w-xl flex-col justify-center gap-10">
      <div
        onClick={() => startGame('default')}
        className="mx-auto flex h-28 w-[60%] items-center gap-6 rounded-xl bg-white p-4 shadow-md"
      >
        <img src={DefaultModIcon} className="h-16 w-16" />
        <div className="w-full text-center text-xl text-primary">기본 모드</div>
      </div>
      <div
        onClick={() => startGame('inf')}
        className=" mx-auto flex h-28 w-[60%] items-center gap-6 rounded-xl bg-white p-4 shadow-md"
      >
        <img src={InfModIcon} className="h-16 w-16" />
        <div className="w-full text-center text-xl text-primary">무한 모드</div>
      </div>
    </div>
  );
};
