import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const membersApi = {
  endPoint: {
    login: '/members/token',
    register: '/members',
    guest: 'members/guests',

    names: '/members/names',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  login: async ({ name }: MemberType) => {
    const { data } = await api.post(membersApi.endPoint.login, {
      name,
    });
    return data.accessToken;
  },

  register: async ({ name, group }: MemberType) => {
    const { data } = await api.post(membersApi.endPoint.register, {
      name,
      group: group?.name?.length == 0 ? null : group?.name,
    });

    return data.accessToken;
  },
};

export default membersApi;
