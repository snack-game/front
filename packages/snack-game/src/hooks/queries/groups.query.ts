import { useQuery } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';

import groupsApi from '@api/groups';

import { QUERY_KEY } from '@constants/api';

interface useGetGroupsNamesProps {
  startWidth: string;
  enabled: boolean;
}

export const useGetGroupsNames = ({
  startWidth,
  enabled,
}: useGetGroupsNamesProps) => {
  const { isLoading, data } = useQuery<AxiosResponse<string[]>, AxiosError>(
    [QUERY_KEY.GROUPS_NAMES, startWidth],
    () => groupsApi.getGroupsNames(startWidth),
    {
      enabled,
    },
  );

  return { isLoading, data };
};
