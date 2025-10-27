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
