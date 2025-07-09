// this store is used to temporary store mock data

import { create } from 'zustand';
import type { StaffItem, CustomerInfo } from '@/types/user';

interface mockStore {
  staffList: StaffItem[];
  customerList: CustomerInfo[];
  setStaffList: (staffList: StaffItem[]) => void;
  setCustomerList: (customerList: CustomerInfo[]) => void;
}

export const useMockStore = create<mockStore>((set) => ({
  staffList: [],
  customerList: [],
  setStaffList: (staffList) => set({ staffList }),
  setCustomerList: (customerList) => set({ customerList })
}));
