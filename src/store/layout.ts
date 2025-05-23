import { create } from 'zustand';

interface LayoutStore {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isSideBarOpen: true,
  toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen }))
}));
