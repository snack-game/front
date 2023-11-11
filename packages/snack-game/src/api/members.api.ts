import api from '@api/index';

const membersApi = {
  endPoint: {
    names: '/members/names',
    changeMemberName: '/members/me/name',
    integrateMember: 'members/me/integrate',
  },

  changeMemberName: async (name: string): Promise<void> => {
    return await api.put(membersApi.endPoint.changeMemberName, { name });
  },

  integrateMember: async (): Promise<void> => {
    return await api.post(membersApi.endPoint.integrateMember);
  },
};

export default membersApi;
