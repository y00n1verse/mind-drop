'use client';

import { UserPen } from 'lucide-react';
import SettingsButton from './SettingsButton';
import { useTranslation } from 'react-i18next';

export default function ChangeNicknameButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <SettingsButton
      onClick={onClick}
      icon={<UserPen />}
      label={t('mypage.changeNickname')}
    />
  );
}
