import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserStore {
  userInfo: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: {
    id: 'admin-user',
    username: 'Will Smith',
    avatarUrl: 'https://dub.sh/C8TrSJF',
    role: 'admin',
    positionPath: ['R&D', 'Frontend Engineer']
  },
  setUser: (user) => set({ userInfo: user })
}));
