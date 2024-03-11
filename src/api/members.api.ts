import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

const membersApi = {
  endPoint: {
    names: '/members/names',
    changeMemberName: '/members/me/name',
    integrateMember: '/members/me/integrate',
    getMemberProfile: '/members/me',
    changeMemberImage: '/members/me/profile-image',
  },

  changeMemberName: async (name: string): Promise<void> => {
    return await api.put(membersApi.endPoint.changeMemberName, { name });
  },

  integrateMember: async (): Promise<MemberType> => {
    const { data } = await api.post(membersApi.endPoint.integrateMember, {});
    return data;
  },

  getMemberProfile: async (): Promise<MemberType> => {
    const { data } = await api.get(membersApi.endPoint.getMemberProfile);
    return data;
  },

  changeMemberImage: async (profileImage: File) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);

    await api.put(membersApi.endPoint.changeMemberImage, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default membersApi;
