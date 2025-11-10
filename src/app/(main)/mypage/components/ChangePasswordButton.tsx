'use client';

import { KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:shadow-md md:hover:bg-gray-100 lg:p-18"
    >
      <div className="flex items-center justify-start gap-2 md:flex-col md:justify-center">
        <KeyRound className="hidden text-gray-700 md:block md:h-28 md:w-28 lg:h-32 lg:w-32" />
        <span className="block md:mt-2 md:text-lg md:font-semibold md:text-gray-600">
          {t('mypage.changePassword')}
        </span>
      </div>
    </button>
  );
}
