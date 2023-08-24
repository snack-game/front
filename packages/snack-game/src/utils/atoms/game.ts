import { atom, selector } from 'recoil';

import { Apple } from '@modules/apple-game/apple';
import { appleGameStateType } from '@utils/types/game.type';

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

export const appleState = atom<Apple[]>({
  key: ATOM_KEY.APPLE_STATE,
  default: [],
});

export const removedAppleState = atom<Apple[]>({
  key: ATOM_KEY.REMOVED_APPLE_STATE,
  default: [],
});
