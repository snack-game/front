import { atom, selector } from 'recoil';

import { ModalType, toastStateType } from '@utils/types/common.type';

import { ATOM_KEY } from '@constants/atom.constant';
import { TOAST_ID } from '@constants/common.constant';

export const modalState = atom<ModalType>({
  key: ATOM_KEY.MODAL,
  default: {
    open: false,
  },
});

export const toastState = atom<toastStateType>({
  key: ATOM_KEY.TOAST,
  default: {
    id: TOAST_ID,
    message: '',
    type: 'success',
  },
});

export const resetToastState = selector({
  key: ATOM_KEY.RESET_TOAST,
  get: ({ get }) => get(toastState),
  set: ({ reset }) => reset(toastState),
});

export const themeState = atom({
  key: ATOM_KEY.THEME,
  default: selector({
    key: ATOM_KEY.DEFAULT_THEME,
    get: () => {
      const storedTheme = window.localStorage.getItem('theme');
      if (!storedTheme) {
        window.localStorage.setItem('theme', JSON.stringify('light'));
        return 'light';
      }
      return JSON.parse(storedTheme);
    },
  }),
});
