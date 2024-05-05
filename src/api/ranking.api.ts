import api from '@api/index';
import { RankingType, SeasonType } from '@utils/types/common.type';

const rankingApi = {
  endPoint: {
    totalRanking: '/rankings?by=BEST_SCORE',
    userRanking: '/rankings/me?by=BEST_SCORE',

    seasonRanking: '/rankings',
    seasonRankingMe: '/rankings',

    seasons: '/seasons',
  },

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  totalRanking: async () => {
    const { data } = await api.get(rankingApi.endPoint.totalRanking);
    return data;
  },

  userRanking: async () => {
    const { data } = await api.get(rankingApi.endPoint.userRanking);
    return data;
  },

  seasonRanking: async (season: number): Promise<RankingType[]> => {
    const { data } = await api.get(
      `${rankingApi.endPoint.seasonRanking}/${season}?by=BEST_SCORE`,
    );
    return data;
  },

  seasonRankingMe: async (season: number) => {
    const { data } = await api.get(
      `${rankingApi.endPoint.seasonRankingMe}/${season}/me?by=BEST_SCORE`,
    );
    return data;
  },

  seasons: async (): Promise<SeasonType[]> => {
    const { data } = await api.get(rankingApi.endPoint.seasons);
    return data;
  },
};

export default rankingApi;
