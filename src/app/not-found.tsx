'use client';

import Link from 'next/link';
import { HomeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotFoundIcon from '@/assets/icons/NotFoundIcon.svg';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center gap-6">
        <NotFoundIcon />
        <p className="mt-2 mb-4 text-4xl text-gray-600">404 Error</p>
        <div className="mb-2 flex flex-col gap-1 text-base text-gray-800">
          <p className="text-base whitespace-pre-line">
            {t('notFound.description')}
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-5 py-3 text-white transition hover:bg-[var(--color-brand-primary-hover)]"
        >
          <HomeIcon className="h-5 w-5" />
          {t('notFound.button')}
        </Link>
      </div>
    </main>
  );
}
