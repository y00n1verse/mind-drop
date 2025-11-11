'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { emotions } from '@/constants/emotions';
import Label from '@/app/components/common/Label';
import Button from '@/app/components/common/Button';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { useSearchParams, useRouter } from 'next/navigation';
import DiaryForm, { DiaryFormHandle } from '@/app/components/diary/DiaryForm';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function DiaryDetailPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const { getDiaryByDate, selectedDate } = useDiaryStore();
  const diary = getDiaryByDate(date || '');
  const { setShowNav } = useLayoutStore();

  const formRef = useRef<DiaryFormHandle>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setShowNav(!isEditMode);
    return () => setShowNav(true);
  }, [isEditMode, setShowNav]);

  if (!diary) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 text-center md:gap-8">
        <p className="text-xl md:text-2xl">{t('diaryDetail.notFound')}</p>
        <div className="flex gap-3">
          <Button
            size="large"
            variant="cancel"
            onClick={() => router.push('/calendar')}
          >
            {t('diaryDetail.back')}
          </Button>
          <Button
            size="large"
            variant="complete"
            onClick={() => router.push(`/diary/form?date=${date}`)}
          >
            {t('diaryDetail.writeNow')}
          </Button>
        </div>
      </div>
    );
  }

  const emotionData = emotions.find((e) => e.variant === diary.emotion);

  const handleSave = () => {
    setIsEditMode(false);
    router.push(`/diary/detail?date=${selectedDate}`);
  };

  const handleCancel = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      router.push('/calendar');
    }
  };

  return (
    <div className="relative mx-auto max-w-3xl items-center p-6 md:flex md:justify-center md:p-8">
      <header className="mb-10 flex items-center justify-between md:hidden">
        <button
          onClick={handleCancel}
          className="flex items-center justify-center rounded-full p-1 transition hover:bg-gray-100"
          aria-label={t('diaryDetail.back')}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <h1 className="text-xl">
          {' '}
          {t('diaryForm.dateTitle', {
            month: selectedDate ? new Date(selectedDate).getMonth() + 1 : '',
            day: selectedDate ? new Date(selectedDate).getDate() : '',
          })}
        </h1>

        {isEditMode ? (
          <button
            onClick={() => formRef.current?.submit()}
            className={`font-medium transition ${
              isFormValid
                ? 'cursor-pointer text-[var(--color-brand-primary)] hover:scale-105'
                : 'cursor-not-allowed text-gray-400'
            }`}
          >
            {t('diaryDetail.save')}
          </button>
        ) : (
          <button
            onClick={() => setIsEditMode(true)}
            className="cursor-pointer font-medium text-[var(--color-brand-primary)] transition hover:scale-105"
          >
            {t('diaryDetail.edit')}
          </button>
        )}
      </header>

      {isEditMode ? (
        <div className="w-full max-w-2xl">
          <DiaryForm
            ref={formRef}
            mode="edit"
            diary={diary}
            onSuccess={handleSave}
            onFormStateChange={setIsFormValid}
            onCancel={() => setIsEditMode(false)}
          />
        </div>
      ) : (
        <div className="flex w-full max-w-2xl flex-col gap-4 text-lg md:gap-8">
          <h1 className="border-b border-gray-300 px-3 py-2 text-xl font-semibold md:text-2xl">
            {diary.title}
          </h1>

          <div className="h-60 overflow-y-auto border-b border-gray-300 px-3 py-2 text-lg leading-relaxed break-words whitespace-pre-wrap md:text-xl">
            {diary.content}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-lg md:text-xl">{t('diaryDetail.feeling')}</p>
            <div className="flex justify-between">
              {emotionData && (
                <div className="flex flex-col items-center gap-2 p-2">
                  <emotionData.Icon
                    className={`h-17 w-17 md:h-21 md:w-21 lg:h-23 lg:w-23 ${emotionData.color}`}
                  />
                  <Label
                    label={emotionData.label}
                    variant={emotionData.variant}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-11 hidden justify-end gap-3 md:flex">
            <Button
              type="button"
              size="large"
              variant="cancel"
              onClick={() => router.push('/calendar')}
            >
              {t('diaryDetail.list')}
            </Button>

            <Button
              type="button"
              size="large"
              variant="complete"
              onClick={() => setIsEditMode(true)}
            >
              {t('diaryDetail.edit')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
