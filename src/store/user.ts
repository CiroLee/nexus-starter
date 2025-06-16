import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserStore {
  userInfo: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: {
    id: 'admin-user',
    token: 'ixr9J22Hv5S8wtPy50QscRtt2bgPHeOUhlyPlQuotE',
    username: 'Will Smith',
    avatarUrl: 'https://dub.sh/C8TrSJF',
    role: 'admin',
    contact: '(123)456-789',
    email: 'will_smith@nexus-starter.com',
    country: 'usa',
    positionPath: ['R&D', 'Frontend Engineer']
  },
  setUser: (user) => set({ userInfo: user })
}));
