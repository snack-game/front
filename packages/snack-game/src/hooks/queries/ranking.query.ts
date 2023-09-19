import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import rankingApi from '@api/ranking';
import { RankingType } from '@utils/types/common.type';

export const useGetTotalRanking = () => {
  const { data } = useQuery<RankingType[], AxiosError>(
    'totalRanking',
    rankingApi.totalRanking,
    {
      useErrorBoundary: true,
    },
  );

  return data;
};

export const useGetUserRanking = () => {
  const { data } = useQuery<RankingType, AxiosError>(
    'userRanking',
    rankingApi.userRanking,
    {
      useErrorBoundary: true,
    },
  );

  return data;
};
