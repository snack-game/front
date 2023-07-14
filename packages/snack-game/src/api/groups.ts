import api from './index';

type GroupsNamesType = string[];

const groupsApi = {
  endPoint: {
    groupsNames: '/groups/names',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  getGroupsNames: async (startWith: string) => {
    const response = await api.get<GroupsNamesType>(
      groupsApi.endPoint.groupsNames,
      {
        headers: groupsApi.headers,
        params: {
          startWith: startWith,
        },
      },
    );

    return response;
  },
};

export default groupsApi;
