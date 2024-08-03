import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

export const changeMemberName = async (name: string): Promise<MemberType> => {
  const { data } = await api.put('/members/me/name', {
    name,
  });
  return data;
};

export const integrateMember = async (): Promise<MemberType> => {
  const { data } = await api.post('/members/me/integrate', {});
  return data;
};

export const getMemberProfile = async (): Promise<MemberType> => {
  const { data } = await api.get('/members/me');
  return data;
};

export const changeMemberImage = async (
  profileImage: File,
): Promise<MemberType> => {
  const formData = new FormData();
  formData.append('profileImage', profileImage);

  const { data } = await api.put('/members/me/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
