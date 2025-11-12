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
    <div className="relative mx-auto flex max-w-3xl flex-col items-center p-5 md:min-h-screen md:justify-center md:p-8">
      <header className="mb-6 flex w-full items-center justify-between md:mb-12 md:px-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center justify-center rounded-full p-1 transition hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 md:h-7 md:w-7" />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <h1 className="text-xl font-medium md:text-2xl">{title}</h1>

        {rightButton ? (
          <button
            onClick={rightButton.onClick}
            className={`text-base font-medium md:text-lg ${
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
