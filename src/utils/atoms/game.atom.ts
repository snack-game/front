import { atom } from 'recoil';

import { ATOM_KEY } from '@constants/atom.constant';

interface PixiState {
  pixiInit: boolean;
  assetsInit: boolean;
}

export const pixiState = atom<PixiState>({
  key: ATOM_KEY.PIXI,
  default: {
    pixiInit: false,
    assetsInit: false,
  },
});
