import instance from '@/lib/instance';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useLoadingStore } from '@/stores/useLoadingStore';

type EmotionType = 'best' | 'good' | 'normal' | 'bad' | 'worst';

export interface Diary {
  userId: string;
  date: string;
  title: string;
  content: string;
  emotion: EmotionType;
}

interface DiaryStore {
  diaries: Diary[];
  selectedDate: string | null;

  setSelectedDate: (date: string | null) => void;
  reset: () => void;
  getUserDiaries: () => Promise<void>;
  getDiaryByDate: (date: string) => Diary | undefined;
  addDiary: (diary: Omit<Diary, 'userId'>) => Promise<void>;
  updateDiary: (date: string, updated: Partial<Diary>) => Promise<void>;
  deleteDiary: (date: string) => Promise<void>;
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      diaries: [],
      selectedDate: null,

      setSelectedDate: (date) => set({ selectedDate: date }),
      reset: () => set({ diaries: [], selectedDate: null }),

      getUserDiaries: async () => {
        const { start, stop } = useLoadingStore.getState();
        try {
          start();
          const res = await instance.get('/diaries');
          set({ diaries: res.data });
        } catch (e) {
          console.error('일기 리스트를 가져오는데 실패했어요: ', e);
        } finally {
          stop();
        }
      },

      getDiaryByDate: (date) => get().diaries.find((d) => d.date === date),

      addDiary: async (d) => {
        const { start, stop } = useLoadingStore.getState();
        try {
          start();
          const res = await instance.post('/diaries', d);
          set((state) => ({ diaries: [...state.diaries, res.data] }));
        } catch (e) {
          console.error('일기를 추가하는데 실패했어요: ', e);
        } finally {
          stop();
        }
      },

      updateDiary: async (date, updated) => {
        const { start, stop } = useLoadingStore.getState();
        try {
          start();
          const res = await instance.put('/diaries', { date, ...updated });
          set((state) => ({
            diaries: state.diaries.map((diary) =>
              diary.date === date ? res.data : diary,
            ),
          }));
        } catch (e) {
          console.error('일기를 수정하는데 실패했어요: ', e);
        } finally {
          stop();
        }
      },

      deleteDiary: async (date) => {
        const { start, stop } = useLoadingStore.getState();
        try {
          start();
          await instance.delete('/diaries', { params: { date } });
          set((state) => ({
            diaries: state.diaries.filter((d) => d.date !== date),
          }));
        } catch (e) {
          console.error('일기를 삭제하는데 실패했어요: ', e);
        } finally {
          stop();
        }
      },
    }),
    { name: 'diary-storage' },
  ),
);
