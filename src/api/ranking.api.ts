import api from '@api/index';
import {
  RankingType,
  RankingViewType,
  SeasonType,
} from '@utils/types/common.type';

const rankingApi = {
  endPoint: {
    ranking: ({
      gameId,
      season,
      user = false,
    }: {
      gameId: RankingViewType;
      season?: number;
      user?: boolean;
    }) => {
      const seasonPath = season ? `/${season}` : '';
      const userPath = user ? '/me' : '';

      return `/rankings/${gameId}${seasonPath}${userPath}?by=BEST_SCORE`;
    },
    seasons: '/seasons',
  },

  totalRanking: async (gameId: RankingViewType) => {
    const { data } = await api.get(rankingApi.endPoint.ranking({ gameId }));
    return data;
  },

  userRanking: async (gameId: RankingViewType) => {
    const { data } = await api.get(
      rankingApi.endPoint.ranking({ gameId, user: true }),
    );
    return data;
  },

  seasonRanking: async (
    season: number,
    gameId: RankingViewType,
  ): Promise<RankingType[]> => {
    const { data } = await api.get(
      rankingApi.endPoint.ranking({ gameId, season }),
    );
    return data;
  },

  seasonRankingMe: async (season: number, gameId: RankingViewType) => {
    const { data } = await api.get(
      rankingApi.endPoint.ranking({ gameId, season, user: true }),
    );
    return data;
  },

  seasons: async (): Promise<SeasonType[]> => {
    const { data } = await api.get(rankingApi.endPoint.seasons);
    return data;
  },
};

export default rankingApi;
