import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface UserStore {
  userInfo?: User;
  setUser: (user: User | undefined) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: undefined,
      setUser: (user) => set({ userInfo: user }),
      clearUser: () => set({ userInfo: undefined })
    }),
    {
      name: 'user-storage' // unique name
    }
  )
);
