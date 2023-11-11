import { AxiosError } from 'axios';

import { ServerError } from '@constants/api.constant';
import useToast from '@hooks/useToast';

const useOnError = () => {
  const openToast = useToast();

  return (error: AxiosError<ServerError>) => {
    if (!error.response) throw error;

    openToast(error.response.data.messages, 'error');
  };
};

export default useOnError;
