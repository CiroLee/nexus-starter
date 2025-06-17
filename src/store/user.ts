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
    appKeys: [
      { name: 'webstorm', key: '8e2f4153-0828-41af-bd8a-ef69818e6214' },
      { name: 'photoshop', key: 'c0a22ae5-be2b-47ff-bf55-8aba91829a9e' }
    ],
    username: 'Will Smith',
    avatarUrl: 'https://dub.sh/C8TrSJF',
    role: 'admin',
    contact: '(123)456-789',
    email: 'will_smith@nexus-starter.com',
    country: 'usa',
    positionPath: ['R&D', 'Frontend Engineer'],
    joinAt: '2021/1/12'
  },
  setUser: (user) => set({ userInfo: user })
}));
