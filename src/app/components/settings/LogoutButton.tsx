'use client';

import { LogOutIcon } from 'lucide-react';
import SettingsButton from './SettingsButton';
import { useTranslation } from 'react-i18next';

export default function LogoutButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <SettingsButton
      onClick={onClick}
      icon={<LogOutIcon />}
      label={t('mypage.logOut')}
    />
  );
}
