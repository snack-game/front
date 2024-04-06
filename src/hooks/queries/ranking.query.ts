import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import rankingApi from '@api/ranking.api';
import { RankingType } from '@utils/types/common.type';

import { QUERY_KEY, ServerError } from '@constants/api.constant';

export const useGetTotalRanking = () => {
  const { data } = useSuspenseQuery<RankingType[], AxiosError>({
    queryKey: [QUERY_KEY.TOTAL_RANKING],
    queryFn: rankingApi.totalRanking,
  });

  return data;
};

export const useGetUserRanking = () => {
  const { data } = useQuery<RankingType, AxiosError<ServerError>>({
    queryKey: [QUERY_KEY.USER_RANKING],
    queryFn: rankingApi.userRanking,
    throwOnError: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });

  return data;
};

export const useGetSeasonRanking = (season: number) => {
  const { data } = useSuspenseQuery<RankingType[], AxiosError>({
    queryKey: [QUERY_KEY.SEASON_RANKING, season],
    queryFn: () => rankingApi.seasonRanking(season),
  });

  return data;
};

export const useGetSeasonRankingMe = (season: number) => {
  const { data } = useQuery<RankingType, AxiosError<ServerError>>({
    queryKey: [QUERY_KEY.SEASON_USER_RANKING, season],
    queryFn: () => rankingApi.seasonRankingMe(season),
    throwOnError: (error: AxiosError<ServerError>) => {
      if (!error.response) throw error;

      return error.response?.status >= 500;
    },
  });

  return data;
};
