import { atom, selector } from 'recoil';

import {
  appleGameProgressType,
  appleGameStateType,
} from '@utils/types/game.type';

import { ATOM_KEY } from '@constants/atom.constant';

export const appleGameState = atom<appleGameStateType>({
  key: ATOM_KEY.APPLE_GAME,
  default: {
    apples: [],
    sessionId: 0,
    score: 0,
  },
});

export const resetAppleGameState = selector({
  key: ATOM_KEY.RESET_APPLE_GAME,
  get: ({ get }) => get(appleGameState),
  set: ({ reset }) => reset(appleGameState),
});

export const appleGameProgressState = atom<appleGameProgressType>({
  key: ATOM_KEY.APPLE_GAME_PROGRESS,
  default: [],
});
