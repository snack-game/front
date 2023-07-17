import { create } from 'zustand';

import { MemberType } from '@utils/types/member.type';

interface State {
  user: MemberType;
}

interface Actions {
  updateUser: (user: MemberType) => void;
}

const useUserStore = create<State & Actions>((set) => ({
  user: {
    name: '',
    group: '',
  },
  updateUser: (user) => set({ user }),
}));

export default useUserStore;
