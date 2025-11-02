import { Diary } from '@/stores/useDiaryStore';
import { emotions } from '@/constants/emotions';

export function getEmotionStatsByMonth(diaries: Diary[], yearMonth: string) {
  const sameMonthDiaries = diaries.filter((diary) =>
    diary.date.startsWith(yearMonth),
  );

  const emotionCounts: Record<string, number> = {
    best: 0,
    good: 0,
    normal: 0,
    bad: 0,
    worst: 0,
  };

  for (const diary of sameMonthDiaries) {
    emotionCounts[diary.emotion] += 1;
  }

  const result = emotions.map((emotion) => {
    return {
      label: emotion.label,
      variant: emotion.variant,
      Icon: emotion.Icon,
      color: emotion.color,
      uv: emotionCounts[emotion.variant],
    };
  });

  return result;
}
