import { useMutation, useQuery } from 'react-query';

import { AxiosError } from 'axios';

import groupsApi from '@api/groups.api';

import { QUERY_KEY, ServerError } from '@constants/api.constant';
import { TOAST_MESSAGE } from '@constants/toast.constant';
import useToast from '@hooks/useToast';

interface useGetGroupsNamesProps {
  startWidth: string;
  enabled: boolean;
}

export const useGetGroupsNames = ({
  startWidth,
  enabled,
}: useGetGroupsNamesProps) => {
  const { isLoading, data } = useQuery<string[], AxiosError>(
    [QUERY_KEY.GROUPS_NAMES, startWidth],
    () => groupsApi.getGroupsNames(startWidth),
    {
      useErrorBoundary: true,
      enabled,
    },
  );

  return { isLoading, data };
};

export const useChangeGroupName = () => {
  const openToast = useToast();

  return useMutation({
    mutationFn: groupsApi.changeGroupName,
    onSuccess: () => {
      openToast(TOAST_MESSAGE.CHANGE_GROUP, 'success');
    },
    onError: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      openToast(error.response.data.messages, 'error');
    },
    useErrorBoundary: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });
};
