'use client';

import { useTranslation } from 'react-i18next';
import { emotions } from '@/constants/emotions';
import Label from '@/app/components/common/Label';

interface DiaryDetailProps {
  diary: {
    title: string;
    content: string;
    emotion: string;
    date?: string | Date;
  };
  onEdit: () => void;
  onBack?: () => void;
}

export default function DiaryDetail({ diary, onEdit }: DiaryDetailProps) {
  const { t } = useTranslation();
  const emotionData = emotions.find((e) => e.variant === diary.emotion);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 text-base md:gap-10 md:text-lg">
      <div className="flex flex-col gap-2">
        <label className="px-2 text-base font-medium text-gray-800 md:text-lg">
          {t('diaryForm.title')}
        </label>
        <h1 className="border-t border-gray-300 px-3 py-2 text-lg font-medium md:text-xl">
          {diary.title}
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <label className="px-2 text-base font-medium text-gray-800 md:text-lg">
          {t('diaryForm.content')}
        </label>
        <div className="h-40 overflow-y-auto border-t border-gray-300 px-3 py-2 text-sm leading-relaxed break-words whitespace-pre-wrap md:h-50 md:text-base">
          {diary.content}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="border-b border-gray-300 px-2 pb-2 text-base font-medium text-gray-800 md:text-lg">
          {t('diaryDetail.feeling')}
        </p>
        <div className="flex justify-start">
          {emotionData && (
            <div className="flex flex-col items-center gap-2 p-2">
              <emotionData.Icon
                className={`h-14 w-14 md:h-18 md:w-18 lg:h-22 lg:w-22 ${emotionData.color}`}
              />
              <Label label={emotionData.label} variant={emotionData.variant} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
