'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { useLayoutStore } from '@/stores/useLayoutStore';
import { useRouter, useSearchParams } from 'next/navigation';
import DiaryForm, { DiaryFormHandle } from '@/app/components/diary/DiaryForm';
import DiaryLayout from './DiaryLayout';
import DiaryDetail from './DiaryDetail';

export default function DiaryPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const { getDiaryByDate } = useDiaryStore();
  const { setShowNav } = useLayoutStore();
  const diary = date ? getDiaryByDate(date) : null;
  const isEdit = searchParams.get('edit') === 'true';
  const isNew = !isEdit && !diary;
  const isDetail = !!(diary && !isEdit && !isNew);

  const formRef = useRef<DiaryFormHandle>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const parsedDate = useMemo(() => (date ? new Date(date) : null), [date]);

  const formattedTitle = useMemo(() => {
    if (isNew) return t('diaryForm.createTitle');
    if (isEdit) return t('diaryForm.editTitle');
    if (isDetail && parsedDate) {
      return t('diaryDetail.title', {
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate(),
      });
    }
    return '';
  }, [isNew, isEdit, isDetail, parsedDate, t]);

  useEffect(() => {
    const shouldHideNav = isNew || isEdit || isDetail;
    setShowNav(!shouldHideNav);
    return () => setShowNav(true);
  }, [isEdit, isNew, isDetail, setShowNav]);

  useEffect(() => {
    if (!date) router.push('/calendar');
  }, [date, router]);

  if (!date) return null;

  if (isNew || !diary) {
    return (
      <DiaryLayout
        title={formattedTitle}
        onBack={() => router.push('/calendar')}
        rightButton={{
          label: t('diaryFormPage.save'),
          onClick: () => formRef.current?.submit(),
          active: isFormValid,
        }}
      >
        <DiaryForm
          ref={formRef}
          mode="create"
          onSuccess={() => router.push(`/diary?date=${date}`)}
          onFormStateChange={setIsFormValid}
        />
      </DiaryLayout>
    );
  }

  if (isEdit) {
    return (
      <DiaryLayout
        title={formattedTitle}
        onBack={() => router.push(`/diary?date=${date}`)}
        rightButton={{
          label: t('diaryDetail.save'),
          onClick: () => formRef.current?.submit(),
          active: isFormValid,
        }}
      >
        <DiaryForm
          ref={formRef}
          mode="edit"
          diary={diary}
          onSuccess={() => router.push(`/diary?date=${date}`)}
          onFormStateChange={setIsFormValid}
          onCancel={() => router.push(`/diary?date=${date}`)}
        />
      </DiaryLayout>
    );
  }

  return (
    <DiaryLayout
      title={formattedTitle}
      onBack={() => router.push('/calendar')}
      rightButton={{
        label: t('diaryDetail.edit'),
        onClick: () => router.push(`/diary?date=${date}&edit=true`),
        active: true,
      }}
      isDetail
    >
      <DiaryDetail
        diary={diary}
        onEdit={() => router.push(`/diary?date=${date}&edit=true`)}
      />
    </DiaryLayout>
  );
}
