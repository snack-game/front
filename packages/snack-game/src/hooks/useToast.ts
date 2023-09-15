import { useSetRecoilState } from 'recoil';

import { toastState } from '@utils/atoms/toast.atom';
import { ToastType } from '@utils/types/common.type';

const useToast = () => {
  const setToastState = useSetRecoilState(toastState);

  const openToast = (message: string, type: ToastType) => {
    setToastState((currentToastState) => ({
      ...currentToastState,
      message,
      type,
    }));
  };

  return openToast;
};

export default useToast;
