'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { emotions } from '@/constants/emotions';
import Button from '@/app/components/common/Button';
import { useDiaryStore } from '@/stores/useDiaryStore';

export default function DiaryPanel() {
  const { t } = useTranslation();
  const { selectedDate, getDiaryByDate } = useDiaryStore();
  const router = useRouter();

  const diary = selectedDate ? getDiaryByDate(selectedDate) : null;

  if (!diary) {
    return (
      <div className="mx-5 flex w-full flex-col items-center justify-center gap-6 rounded-md bg-[oklch(0.937_0_0)] p-4 md:mx-auto md:w-[700px] lg:m-0 lg:w-full lg:gap-8">
        <p className="text-center whitespace-pre-line">
          {t('diaryPanel.emptyMessage')}
        </p>
        <Button
          variant="complete"
          className="h-10 w-35 lg:w-45"
          onClick={() => {
            if (!selectedDate) return;
            router.push(`/diary/form?date=${selectedDate}`);
          }}
        >
          {t('diaryPanel.writeButton')}
        </Button>
      </div>
    );
  }

  const emotionData = emotions.find((e) => e.variant === diary.emotion);
  const { date, title, content } = diary;
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const handleClick = () => {
    if (!selectedDate) return;
    router.push(`/diary/detail?date=${selectedDate}`);
  };

  return (
    <div
      onClick={handleClick}
      className="mx-5 flex w-full cursor-pointer items-center gap-4 rounded-md bg-[oklch(0.937_0_0)] p-5 transition-all hover:scale-[1.01] hover:shadow-md md:mx-auto md:w-[700px] md:p-5 lg:m-0 lg:w-full lg:flex-col lg:items-start lg:gap-5 lg:p-10"
    >
      {emotionData && (
        <div className="md:self-center">
          {emotionData?.Icon && (
            <emotionData.Icon
              className={`h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 ${emotionData.color}`}
            />
          )}
        </div>
      )}

      <p className="hidden w-full text-center text-base text-gray-600 md:text-lg lg:block">
        {t('diaryPanel.title', { month, day })}
      </p>

      <div className="flex w-full flex-col gap-2 md:gap-3 lg:gap-5">
        <div className="flex items-center justify-between">
          <h1 className="line-clamp-1 w-32 text-lg font-semibold md:w-full md:text-xl lg:mt-8 lg:text-2xl">
            {title}
          </h1>
          <p className="text-md hidden text-gray-500 lg:hidden">{date}</p>
        </div>

        <div className="flex items-end justify-between lg:flex-col lg:items-start">
          <p className="line-clamp-1 w-36 text-sm md:text-base lg:line-clamp-6 lg:w-full">
            {content}
          </p>
          <p className="text-right text-sm text-gray-400 lg:hidden">{date}</p>
        </div>
      </div>
    </div>
  );
}
