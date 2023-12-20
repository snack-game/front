import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const membersApi = {
  endPoint: {
    names: '/members/names',
    changeMemberName: '/members/me/name',
    integrateMember: '/members/me/integrate',
  },

  changeMemberName: async (name: string): Promise<void> => {
    return await api.put(membersApi.endPoint.changeMemberName, { name });
  },

  integrateMember: async (): Promise<MemberType> => {
    const { data } = await api.post(
      membersApi.endPoint.integrateMember,
      {},
      {
        withCredentials: true,
      },
    );
    return data;
  },
};

export default membersApi;
