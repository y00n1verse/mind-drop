'use client';

import { Bug } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SettingsButton from './SettingsButton';

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
    <SettingsButton
      onClick={handleClick}
      icon={<Bug />}
      label={t('mypage.reportBug')}
    />
  );
}
