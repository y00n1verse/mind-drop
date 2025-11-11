'use client';

import { KeyRound } from 'lucide-react';
import SettingsButton from './SettingsButton';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <SettingsButton
      onClick={onClick}
      icon={<KeyRound />}
      label={t('mypage.changePassword')}
    />
  );
}
