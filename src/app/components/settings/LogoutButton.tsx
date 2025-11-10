'use client';

import { toast } from 'sonner';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import useModal from '@/app/hooks/useModal';
import SettingsButton from './SettingsButton';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@/app/components/common/ConfirmModal';

export default function LogoutButton() {
  const { t } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/signin' });
    } catch {
      toast.error(t('logout.fail'));
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <SettingsButton
        onClick={openModal}
        icon={<LogOutIcon />}
        label={t('mypage.logOut')}
      />

      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleLogout}
        title={t('logout.modalTitle')}
        description={
          <p className="whitespace-pre-line">{t('logout.description')}</p>
        }
        confirmLabel={t('logout.confirmLabel')}
        cancelLabel={t('logout.cancelLabel')}
        confirmVariant="warn"
      />
    </>
  );
}
