import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const authApi = {
  endPoint: {
    login: '/tokens',
    register: '/members',
    guest: '/tokens/guest',
    social: '/tokens/social',
  },

  login: async ({ member }: MemberType): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.login, {
      name: member.name,
    });
    return { accessToken: data.accessToken, member: data.member };
  },

  register: async ({ member }: MemberType): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.register, {
      name: member.name,
      group: member.group?.name,
    });

    return { accessToken: data.accessToken, member: data.member };
  },

  guest: async (): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.guest);

    return { accessToken: data.accessToken, member: data.member };
  },

  social: async (): Promise<MemberType> => {
    const { data } = await api.post(
      authApi.endPoint.social,
      {},
      {
        withCredentials: true,
      },
    );

    return { accessToken: data.accessToken, member: data.member };
  },
};

export default authApi;
