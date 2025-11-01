'use client';

import { useDiaryStore } from '@/stores/useDiaryStore';
import { emotions } from '@/constants/emotions';
import Button from '../components/common/Button';
import { useRouter } from 'next/navigation';

export default function DiaryPanel() {
  const { selectedDate, getDiaryByDate } = useDiaryStore();
  const router = useRouter();

  const diary = selectedDate ? getDiaryByDate(selectedDate) : null;

  if (!diary) {
    return (
      <div className="m-5 flex h-40 flex-col items-center justify-center gap-6 rounded-md bg-[oklch(0.937_0_0)] p-4 md:m-0 md:h-150 md:w-full md:gap-8 md:p-5 lg:p-8">
        <div className="text-center">
          <p>아직 작성된 일기가 없어요</p>
          <p>일기를 작성하러 갈까요?</p>
        </div>

        <Button
          variant="complete"
          className="h-10 w-35 lg:w-45"
          onClick={() => {
            if (!selectedDate) return;
            router.push(`/diary/form?date=${selectedDate}`);
          }}
        >
          일기쓰러 가기
        </Button>
      </div>
    );
  }

  const emotionData = emotions.find((e) => e.variant === diary.emotion);

  const handleClick = () => {
    if (!selectedDate) return;
    router.push(`/diary/detail?date=${selectedDate}`);
  };

  return (
    <div
      onClick={handleClick}
      className="m-5 flex cursor-pointer items-center gap-4 rounded-md bg-[oklch(0.937_0_0)] p-5 transition-all hover:scale-[1.01] hover:shadow-md md:m-0 md:w-full md:flex-col md:items-start md:gap-5 md:p-5 lg:gap-5 lg:p-10"
    >
      {emotionData && (
        <div className="md:self-center">
          <emotionData.Icon
            className={`h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 ${emotionData.color}`}
          />
        </div>
      )}

      <p className="hidden w-full text-center text-base text-gray-600 md:block md:text-lg">
        {new Date(diary.date).getMonth() + 1}월 {new Date(diary.date).getDate()}
        일 일기
      </p>

      <div className="flex w-full flex-col gap-2 md:gap-5">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold md:mt-4 md:text-xl lg:mt-8 lg:text-2xl">
            {diary.title}
          </h1>
          <p className="text-md hidden text-right text-gray-500 md:hidden">
            {diary.date}
          </p>
        </div>

        <div className="flex items-end justify-between md:flex-col md:items-start">
          <p className="md:truncate-none w-56 truncate text-sm md:w-full md:text-base md:whitespace-pre-line">
            {diary.content}
          </p>
          <p className="text-right text-sm text-gray-400 md:hidden">
            {diary.date}
          </p>
        </div>
      </div>
    </div>
  );
}
