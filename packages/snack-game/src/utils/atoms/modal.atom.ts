import { atom } from 'recoil';

import { ModalType } from '@utils/types/common.type';

import { ATOM_KEY } from '@constants/atom.constant';

export const modalState = atom<ModalType>({
  key: ATOM_KEY.MODAL,
  default: {
    open: false,
  },
});
