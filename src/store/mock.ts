// this store is used to temporary store mock data

import { create } from 'zustand';
import type { StaffItem } from '@/types/user';

interface mockStore {
  staffList: StaffItem[];
  setStaffList: (staffList: StaffItem[]) => void;
}

export const useMockStore = create<mockStore>((set) => ({
  staffList: [],
  setStaffList: (staffList) => set({ staffList })
}));
