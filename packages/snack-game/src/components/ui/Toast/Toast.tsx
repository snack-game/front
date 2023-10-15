import { toast, Toaster } from 'react-hot-toast';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import { resetToastState, toastState } from '@utils/atoms/common.atom';

import useDebounce from '@hooks/useDebounce';

const Toast = () => {
  const { message, type } = useRecoilValue(toastState);
  const resetToast = useResetRecoilState(resetToastState);
  useDebounce({
    target: () => {
      if (message) {
        switch (type) {
          case 'success':
            toast.success(message);
            break;
          case 'error':
            toast.error(message);
            break;
          case 'loading':
            toast.loading(message);
            break;
          case 'info':
            toast(message);
            break;
          case 'warning':
            toast(message, {
              icon: '⚠️',
            });
        }
        resetToast();
      }
    },
    delay: 300,
  });

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
      }}
    />
  );
};

export default Toast;
