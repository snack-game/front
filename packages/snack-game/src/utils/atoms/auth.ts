import { atom } from 'recoil';

import { MemberType } from '@utils/types/member.type';

import { ATOM_KEY } from '@constants/atom.constant';

export const userState = atom<MemberType>({
  key: ATOM_KEY.USER,
  default: {
    name: '',
    group: '',
    accessToken: '',
    bestScore: 0,
    role: undefined,
  },
});
