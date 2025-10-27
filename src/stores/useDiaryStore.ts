import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type EmotionType = 'best' | 'good' | 'normal' | 'bad' | 'worst';

interface Diary {
  date: string;
  title: string;
  content: string;
  emotion: EmotionType;
}

interface DiaryStore {
  diaries: Diary[];
  selectedDate: string | null;

  setSelectedDate: (date: string | null) => void;
  getDiaryByDate: (date: string) => Diary | undefined;
  addDiary: (diary: Diary) => void;
  updateDiary: (date: string, updated: Partial<Diary>) => void;
  deleteDiary: (date: string) => void;
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      diaries: [],
      selectedDate: null,

      setSelectedDate: (date) => set({ selectedDate: date }),

      getDiaryByDate: (date) =>
        get().diaries.find((diary) => diary.date === date),

      addDiary: (diary) =>
        set((state) => ({
          diaries: [...state.diaries, diary],
        })),

      updateDiary: (date, updated) =>
        set((state) => ({
          diaries: state.diaries.map((diary) =>
            diary.date === date ? { ...diary, ...updated } : diary,
          ),
        })),

      deleteDiary: (date) =>
        set((state) => ({
          diaries: state.diaries.filter((diary) => diary.date !== date),
        })),
    }),
    { name: 'diary-storage' },
  ),
);
