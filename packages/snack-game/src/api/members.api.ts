import api from '@api/index';
import { AuthType, MemberType } from '@utils/types/member.type';

const membersApi = {
  endPoint: {
    login: '/members/token',
    register: '/members',
    guest: 'members/guest',

    names: '/members/names',
  },

  login: async ({ name }: MemberType): Promise<AuthType> => {
    const { data } = await api.post(membersApi.endPoint.login, {
      name,
    });
    return { accessToken: data.accessToken, member: data.member };
  },

  register: async ({ name, group }: MemberType): Promise<AuthType> => {
    const { data } = await api.post(membersApi.endPoint.register, {
      name,
      group: group?.name,
    });

    return { accessToken: data.accessToken, member: data.member };
  },

  guest: async (): Promise<AuthType> => {
    const { data } = await api.post(membersApi.endPoint.guest);

    return { accessToken: data.accessToken, member: data.member };
  },
};

export default membersApi;
