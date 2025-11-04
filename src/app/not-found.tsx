'use client';

import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
import NotFoundIcon from '@/assets/icons/NotFoundIcon.svg';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center gap-6">
        <NotFoundIcon />
        <p className="mt-2 mb-4 text-4xl text-gray-600">404 Error</p>
        <div className="mb-2 flex flex-col gap-1 text-base text-gray-800">
          <p className="text-base">
            페이지를 찾을 수 없어요.
            <br />
            페이지가 존재하지 않거나, 사용할 수 없는 페이지에요. <br />
            입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-5 py-3 text-white transition hover:bg-[var(--color-brand-primary-hover)]"
        >
          <HomeIcon className="h-5 w-5" />
          메인으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
