import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const membersApi = {
  endPoint: {
    authUser: '/members',
    guestUser: 'members/guests',
    userNames: '/members/names',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  authUser: async ({ name, group }: MemberType) => {
    const { data } = await api.post(membersApi.endPoint.authUser, {
      name,
      group,
    });

    return data.accessToken;
  },
};

export default membersApi;
