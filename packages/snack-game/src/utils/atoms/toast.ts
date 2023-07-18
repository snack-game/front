import { atom } from 'recoil';

import { ToastType } from '@utils/types/toast.type';

import { TOAST_KEY } from '@constants/atom.constant';
import { TOAST_ID } from '@constants/toast.constant';

interface toastStateType {
  id: string;
  message: string;
  type?: ToastType;
}

export const toastState = atom<toastStateType>({
  key: TOAST_KEY,
  default: {
    id: TOAST_ID,
    message: '',
    type: undefined,
  },
});
