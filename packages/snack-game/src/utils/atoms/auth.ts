import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { MemberType } from '@utils/types/member.type';

import { ATOM_KEY } from '@constants/atom.constant';

const { persistAtom: presistAtomUser } = recoilPersist({
  key: ATOM_KEY.USER_PERSIST,
});

export const userState = atom<MemberType>({
  key: ATOM_KEY.USER,
  default: {
    id: 0,
    name: '',
    group: {
      id: 0,
      name: null,
    },
    accessToken: '',
    bestScore: 0,
  },
  effects_UNSTABLE: [presistAtomUser],
});

export const resetUserState = selector({
  key: ATOM_KEY.RESET_USER,
  get: ({ get }) => get(userState),
  set: ({ reset }) => reset(userState),
});
