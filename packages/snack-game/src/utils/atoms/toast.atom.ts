import { atom } from 'recoil';

import { ToastType } from '@utils/types/common.type';

import { ATOM_KEY } from '@constants/atom.constant';
import { TOAST_ID } from '@constants/toast.constant';

interface toastStateType {
  id: string;
  message: string;
  type?: ToastType;
}

export const toastState = atom<toastStateType>({
  key: ATOM_KEY.TOAST,
  default: {
    id: TOAST_ID,
    message: '',
    type: undefined,
  },
});
