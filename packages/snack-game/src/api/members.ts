import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const membersApi = {
  endPoint: {
    login: '/members/token',
    register: '/members',
    guest: 'members/guest',

    names: '/members/names',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  login: async ({ name }: MemberType): Promise<MemberType> => {
    const { data } = await api.post(membersApi.endPoint.login, {
      name,
    });
    return data;
  },

  register: async ({ name, group }: MemberType): Promise<MemberType> => {
    const { data } = await api.post(membersApi.endPoint.register, {
      name,
      group: group?.name,
    });

    return data;
  },

  guest: async (): Promise<MemberType> => {
    const { data } = await api.post(membersApi.endPoint.guest);

    return data;
  },
};

export default membersApi;
