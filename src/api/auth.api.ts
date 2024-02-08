import api from '@api/index';
import { ACToken, MemberType } from '@utils/types/member.type';

const authApi = {
  endPoint: {
    login: '/tokens',
    register: '/members',
    guest: '/tokens/guest',
    social: '/tokens/social',
    tokenReIssue: 'tokens/me',
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
    const { data } = await api.post(authApi.endPoint.social, {});

    return { accessToken: data.accessToken, member: data.member };
  },

  tokenReIssue: async (): Promise<void> => {
    await api.patch(authApi.endPoint.tokenReIssue, {});
  },
};

export default authApi;
