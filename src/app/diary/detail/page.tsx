'use client';

import { ChevronLeft } from 'lucide-react';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { emotions } from '@/constants/emotions';
import Label from '@/app/components/common/Label';
import Button from '@/app/components/common/Button';

export default function DiaryDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const { getDiaryByDate } = useDiaryStore();
  const diary = getDiaryByDate(date || '');

  if (!diary) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-lg">해당 날짜에는 일기가 존재하지 않습니다.</p>
        <Button
          variant="complete"
          className="mt-5"
          onClick={() => router.push('/calendar')}
        >
          돌아가기
        </Button>
      </div>
    );
  }

  const emotionData = emotions.find((e) => e.variant === diary.emotion);

  return (
    <div className="relative mx-auto max-w-3xl p-6 md:flex md:items-center md:justify-center md:p-8">
      <header className="mb-10 flex items-center justify-between md:hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-full p-1 transition hover:bg-gray-100"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <h1 className="text-xl">오늘의 일기</h1>

        <button className="cursor-pointer font-medium text-gray-400 transition hover:text-[var(--color-brand-primary)]">
          수정
        </button>
      </header>

      <div className="flex w-full max-w-2xl flex-col gap-8 text-lg">
        <h1 className="border-b border-gray-300 px-3 py-2 text-xl font-semibold md:text-2xl">
          {diary.title}
        </h1>

        <div className="h-60 border-b border-gray-300 px-3 py-2 text-lg leading-relaxed whitespace-pre-wrap md:text-xl">
          {diary.content}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-lg md:text-xl">오늘의 기분</p>
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
            취소
          </Button>

          <Button type="button" size="large" variant="complete">
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
