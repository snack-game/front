import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';

import membersApi from '@api/members.api';

import { ServerError } from '@constants/api.constant';
import useToast from '@hooks/useToast';

export const useChangeUserName = () => {
  const openToast = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: membersApi.changeMemberName,
    onSuccess: () => {
      openToast(t('member_change_name'), 'success');
    },
    onError: useOnError(),
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};

const useOnError = () => {
  const openToast = useToast();

  return (error: AxiosError<ServerError>) => {
    if (!error.response) throw error;

    openToast(error.response.data.messages, 'error');
  };
};

export const useIntegrateMember = () => {
  return useMutation({
    mutationFn: membersApi.integrateMember,
  });
};
