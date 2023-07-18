import { toast, Toaster } from 'react-hot-toast';

import { useRecoilValue } from 'recoil';

import { toastState } from '@utils/atoms/toast';

import useDebounce from '@hooks/useDebounce';

const Toast = () => {
  const { message, type } = useRecoilValue(toastState);

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
