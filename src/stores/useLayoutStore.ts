import { create } from 'zustand';

interface LayoutState {
  showNav: boolean;
  setShowNav: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  showNav: true,
  setShowNav: (value) => set({ showNav: value }),
}));
