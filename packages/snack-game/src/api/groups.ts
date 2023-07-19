import api from './index';

type GroupsNamesType = string[];

const groupsApi = {
  endPoint: {
    names: '/groups/names',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  getGroupsNames: async (startWith: string) => {
    return await api.get<GroupsNamesType>(groupsApi.endPoint.names, {
      headers: groupsApi.headers,
      params: {
        startWith: startWith,
      },
    });
  },
};

export default groupsApi;
