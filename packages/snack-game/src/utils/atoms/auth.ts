import { atom } from 'recoil';

import { MemberType } from '@utils/types/member.type';

import { USER_KEY } from '@constants/atom.constant';

export const userState = atom<MemberType>({
  key: USER_KEY,
  default: {
    name: '',
    group: '',
    accessToken: '',
    bestScore: 0,
    role: undefined,
  },
});
