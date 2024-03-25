import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const authApi = {
  endPoint: {
    login: '/tokens',
    logOut: '/tokens/me',
    register: '/members',
    guest: '/tokens/guest',
    social: '/tokens/social',
    tokenReIssue: 'tokens/me',
  },

  login: async (member: MemberType): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.login, {
      name: member.name,
    });

    return data;
  },

  logOut: async (): Promise<void> => {
    await api.delete(authApi.endPoint.logOut);
  },

  register: async (member: MemberType): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.register, {
      name: member.name,
      group: member.group?.name,
    });

    return data;
  },

  guest: async (): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.guest);

    return data;
  },

  social: async (): Promise<MemberType> => {
    const { data } = await api.post(authApi.endPoint.social, {});

    return data;
  },

  tokenReIssue: async (): Promise<void> => {
    await api.patch(authApi.endPoint.tokenReIssue, {});
  },
};

export default authApi;
