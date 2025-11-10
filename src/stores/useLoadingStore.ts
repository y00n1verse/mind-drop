import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  start: () => void;
  stop: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  start: () => set({ isLoading: true }),
  stop: () => set({ isLoading: false }),
}));
