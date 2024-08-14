import { useTranslation } from 'react-i18next';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { withdraw } from '@api/auth.api';
import {
  changeMemberImage,
  changeMemberName,
  getMemberProfile,
  integrateMember,
} from '@api/members.api';

import { QUERY_KEY, ServerError } from '@constants/api.constant';
import useToast from '@hooks/useToast';

export const useChangeUserName = () => {
  const openToast = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: changeMemberName,
    onSuccess: () => {
      openToast(t('member_change_name'), 'success');
    },
    onError: useOnError(),
    throwOnError: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};

export const useChangeUserImage = () => {
  const openToast = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: changeMemberImage,
    onSuccess: () => {
      openToast(t('member_change_image'), 'success');
    },
    onError: useOnError(),
    throwOnError: (error: AxiosError<ServerError>) => {
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
    mutationFn: integrateMember,
  });
};

export const useGetMemberProfile = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.USER_PROFILE],
    queryFn: getMemberProfile,
  });

  return data;
};

export const useDeleteMember = () => {
  return useMutation({ mutationFn: withdraw });
};
