import { MemberType } from '@utils/types/member.type';

import api from './index';

const groupsApi = {
  endPoint: {
    names: '/groups/names',

    changeName: 'members/me/group',
  },

  getGroupsNames: async (startWith: string) => {
    const { data } = await api.get(groupsApi.endPoint.names, {
      params: {
        startWith,
      },
    });
    return data;
  },

  changeGroupName: async (group: string): Promise<MemberType> => {
    const { data } = await api.put(groupsApi.endPoint.changeName, {
      group,
    });
    return data;
  },
};

export default groupsApi;
