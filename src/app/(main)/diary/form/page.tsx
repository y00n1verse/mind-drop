'use client';

import { toast } from 'sonner';
import { useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DiaryForm, { DiaryFormHandle } from '@/app/components/diary/DiaryForm';

export default function DiaryFormPage() {
  const router = useRouter();
  const formRef = useRef<DiaryFormHandle>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSaveClick = () => {
    formRef.current?.submit();
  };

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
        <button
          onClick={handleSaveClick}
          className={`font-medium transition ${
            isFormValid
              ? 'cursor-pointer text-[var(--color-brand-primary)] hover:scale-105'
              : 'cursor-not-allowed text-gray-400'
          }`}
        >
          저장
        </button>
      </header>

      <DiaryForm
        ref={formRef}
        mode="create"
        onSuccess={() => {
          toast.success('일기 저장 완료!');
          router.push('/calendar');
        }}
        onFormStateChange={setIsFormValid}
      />
    </div>
  );
}
