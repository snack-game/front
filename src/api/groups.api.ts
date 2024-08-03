import { MemberType } from '@utils/types/member.type';

import api from './index';

export const getGroupsNames = async (startWith: string) => {
  const { data } = await api.get('/groups/names', {
    params: {
      startWith,
    },
  });
  return data;
};

export const changeGroupName = async (group: string): Promise<MemberType> => {
  const { data } = await api.put('members/me/group', {
    group,
  });
  return data;
};
