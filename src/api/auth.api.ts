import api from '@api/index';
import { MemberType } from '@utils/types/member.type';

export const login = async (member: MemberType): Promise<MemberType> => {
  const { data } = await api.post('/tokens', {
    name: member.name,
  });

  return data;
};

export const logOut = async (): Promise<void> => {
  await api.delete('/tokens/me');
};

export const register = async (member: MemberType): Promise<MemberType> => {
  const { data } = await api.post('/members', {
    name: member.name,
    group: member.group?.name,
  });

  return data;
};

export const guest = async (): Promise<MemberType> => {
  const { data } = await api.post('/tokens/guest');

  return data;
};

export const social = async (): Promise<MemberType> => {
  const { data } = await api.post('/tokens/social', {});

  return data;
};

export const tokenReIssue = async (): Promise<void> => {
  await api.patch('tokens/me', {});
};
