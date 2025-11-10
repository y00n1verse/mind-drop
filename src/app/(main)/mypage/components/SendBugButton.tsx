'use client';

import { Bug } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SendBugButton() {
  const { t } = useTranslation();

  const handleClick = () => {
    const email = 'jiphrodite@gmail.com';
    const subject = encodeURIComponent('Mind Drop 의견 보내기');
    const body = encodeURIComponent(
      '안녕하세요! 버그 및 피드백 내용을 작성해주세요 :)',
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:shadow-md md:hover:bg-gray-100 lg:p-18"
    >
      <div className="flex items-center justify-start gap-2 md:flex-col md:justify-center">
        <Bug className="hidden text-gray-700 md:block md:h-28 md:w-28 lg:h-32 lg:w-32" />
        <span className="block md:mt-2 md:text-lg md:font-semibold md:text-gray-600">
          {t('mypage.reportBug')}
        </span>
      </div>
    </button>
  );
}
