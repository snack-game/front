import { TOAST_MESSAGE } from '@constants/toast.constant';
import useToast from '@hooks/useToast';

const useError = () => {
  const { openToast } = useToast();

  return (errorType?: number, message?: string) => {
    switch (errorType) {
      case 400:
        openToast(message ?? TOAST_MESSAGE.ERROR_BAD_REQUEST, 'error');
        break;
      case 401:
        openToast(message ?? TOAST_MESSAGE.ERROR_UNAUTHORIZED, 'error');
        break;
      case 403:
        openToast(message ?? TOAST_MESSAGE.ERROR_FORBIDDEN, 'error');
        break;
      case 404:
        openToast(message ?? TOAST_MESSAGE.ERROR_NOT_FOUND, 'error');
        break;
      case 408:
        openToast(message ?? TOAST_MESSAGE.ERROR_TIMEOUT, 'error');
        break;
      case 500:
        openToast(message ?? TOAST_MESSAGE.ERROR_INTERNAL_SERVER, 'error');
        break;
      default:
        openToast(message ?? TOAST_MESSAGE.ERROR_UNKNOWN, 'error');
    }
  };
};

export default useError;
