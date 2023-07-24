import api from './index';

const groupsApi = {
  endPoint: {
    names: '/groups/names',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  getGroupsNames: async (startWith: string) => {
    const { data } = await api.get(groupsApi.endPoint.names, {
      headers: groupsApi.headers,
      params: {
        startWith: startWith,
      },
    });
    return data;
  },
};

export default groupsApi;
