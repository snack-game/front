import api from '@api/index';
import { AuthType, MemberType } from '@utils/types/member.type';

const authApi = {
  endPoint: {
    login: '/tokens',
    register: '/members',
    guest: '/tokens/guest',
    social: '/tokens/social',
  },

  login: async ({ name }: MemberType): Promise<AuthType> => {
    const { data } = await api.post(authApi.endPoint.login, {
      name,
    });
    return { accessToken: data.accessToken, member: data.member };
  },

  register: async ({ name, group }: MemberType): Promise<AuthType> => {
    const { data } = await api.post(authApi.endPoint.register, {
      name,
      group: group?.name,
    });

    return { accessToken: data.accessToken, member: data.member };
  },

  guest: async (): Promise<AuthType> => {
    const { data } = await api.post(authApi.endPoint.guest);

    return { accessToken: data.accessToken, member: data.member };
  },

  social: async (): Promise<AuthType> => {
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
