import { useTranslation } from 'react-i18next';

import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import membersApi from '@api/members.api';

import { QUERY_KEY, ServerError } from '@constants/api.constant';
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
    mutationFn: membersApi.changeMemberImage,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: membersApi.integrateMember,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER_PROFILE] });
    },
  });
};

export const useGetMemberProfile = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.USER_PROFILE],
    queryFn: membersApi.getMemberProfile,
  });

  return data;
};
