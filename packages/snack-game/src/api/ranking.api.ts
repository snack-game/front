import api from '@api/index';

const rankingApi = {
  endPoint: {
    totalRanking: '/rankings?by=BEST_SCORE',
    userRanking: '/rankings/all/me',
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
};

export default rankingApi;
