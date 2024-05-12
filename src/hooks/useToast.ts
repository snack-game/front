import { useSetRecoilState } from 'recoil';

import { toastState } from '@utils/atoms/common.atom';
import { ToastType } from '@utils/types/common.type';

import { TOAST_ID } from '@constants/common.constant';

const useToast = () => {
  const setToastState = useSetRecoilState(toastState);

  const openToast = (message: string, type: ToastType) => {
    setToastState({
      id: TOAST_ID,
      message,
      type,
    });
  };

  return openToast;
};

export default useToast;
