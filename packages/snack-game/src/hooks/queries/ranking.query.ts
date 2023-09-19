import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import rankingApi from '@api/ranking';
import { RankingType } from '@utils/types/common.type';

export const useGetTotalRanking = () => {
  const { isLoading, data } = useQuery<RankingType[], AxiosError>(
    'totalRanking',
    rankingApi.totalRanking,
    {
      useErrorBoundary: true,
    },
  );

  return { isLoading, data };
};

export const useGetUserRanking = () => {
  const { isLoading, data } = useQuery<RankingType, AxiosError>(
    'userRanking',
    rankingApi.userRanking,
    {
      useErrorBoundary: true,
    },
  );

  return { isLoading, data };
};
