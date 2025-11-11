'use client';

import { UserX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SettingsButton from './SettingsButton';

export default function DeleteAccountButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <SettingsButton
      onClick={onClick}
      icon={<UserX />}
      label={t('mypage.deleteAccount')}
      color="text-[var(--color-warn-bg)]"
    />
  );
}
