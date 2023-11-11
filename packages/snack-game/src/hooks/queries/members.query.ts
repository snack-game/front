import { useMutation } from 'react-query';

import { AxiosError } from 'axios';

import membersApi from '@api/members.api';

import { ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useOnError from '@hooks/useOnError';
import useToast from '@hooks/useToast';

export const useChangeUserName = () => {
  const openToast = useToast();

  return useMutation({
    mutationFn: membersApi.changeMemberName,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.CHANGE_USER_NAME, 'success');
    },
    onError: useOnError(),
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};

export const useIntegrateMember = () => {
  const openToast = useToast();

  return useMutation({
    mutationFn: membersApi.integrateMember,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.AUTH_SOCIAL, 'success');
    },
    onError: useOnError(),
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};
