'use client';

import { ChevronLeft } from 'lucide-react';

export default function DiaryLayout({
  title,
  onBack,
  rightButton,
  children,
  isDetail = false,
}: {
  title: string;
  onBack?: () => void;
  rightButton?: {
    label: string;
    onClick: () => void;
    active?: boolean;
  };
  children: React.ReactNode;
  isDetail?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto max-w-3xl p-6 md:p-8 ${
        isDetail ? 'md:mt-18' : ''
      }`}
    >
      <header className="mb-6 flex items-center justify-between md:hidden">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center justify-center rounded-full p-1 transition hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <h1 className="text-xl font-medium">{title}</h1>

        {rightButton ? (
          <button
            onClick={rightButton.onClick}
            className={`font-medium transition ${
              rightButton.active
                ? 'cursor-pointer text-[var(--color-brand-primary)] hover:scale-105'
                : 'cursor-not-allowed text-gray-400'
            }`}
          >
            {rightButton.label}
          </button>
        ) : (
          <div className="w-8" />
        )}
      </header>

      {children}
    </div>
  );
}
