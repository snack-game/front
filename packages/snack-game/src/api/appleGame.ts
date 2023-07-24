import api from './index';

const appleGameApi = {
  endPoint: {
    game: '/games/1',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  gameStart: async (accessToken: string) => {
    const { data } = await api.post(appleGameApi.endPoint.game, null, {
      headers: {
        ...appleGameApi.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data;
  },
};

export default appleGameApi;
