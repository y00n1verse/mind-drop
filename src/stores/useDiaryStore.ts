import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type EmotionType = 'best' | 'good' | 'normal' | 'bad' | 'worst';

interface Diary {
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
  getUserDiaries: (userId: string) => Diary[];
  getDiaryByDate: (userId: string, date: string) => Diary | undefined;
  addDiary: (diary: Diary) => void;
  updateDiary: (userId: string, date: string, updated: Partial<Diary>) => void;
  deleteDiary: (userId: string, date: string) => void;
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      diaries: [],
      selectedDate: null,

      setSelectedDate: (date) => set({ selectedDate: date }),

      getUserDiaries: (userId) =>
        get().diaries.filter((d) => d.userId === userId),

      getDiaryByDate: (userId, date) =>
        get().diaries.find((d) => d.userId === userId && d.date === date),

      addDiary: (d) =>
        set((state) => ({
          diaries: [...state.diaries, d],
        })),

      updateDiary: (userId, date, updated) =>
        set((state) => ({
          diaries: state.diaries.map((diary) =>
            diary.userId === userId && diary.date === date
              ? { ...diary, ...updated }
              : diary,
          ),
        })),

      deleteDiary: (userId, date) =>
        set((state) => ({
          diaries: state.diaries.filter(
            (d) => !(d.userId === userId && d.date === date),
          ),
        })),
    }),
    { name: 'diary-storage' },
  ),
);
