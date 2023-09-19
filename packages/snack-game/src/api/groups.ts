import api from './index';

const groupsApi = {
  endPoint: {
    names: '/groups/names',
  },

  getGroupsNames: async (startWith: string) => {
    const { data } = await api.get(groupsApi.endPoint.names, {
      params: {
        startWith: startWith,
      },
    });
    return data;
  },
};

export default groupsApi;
