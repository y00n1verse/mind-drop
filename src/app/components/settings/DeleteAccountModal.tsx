'use client';

import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@/app/components/common/ConfirmModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('/api/auth/delete-account', { method: 'DELETE' });
      if (res.ok) {
        toast.success(t('deleteAccount.success'), {
          description: t('deleteAccount.successDescription'),
        });
        setTimeout(() => {
          signOut({ callbackUrl: '/signin' });
        }, 2000);
      } else {
        toast.error(t('deleteAccount.fail'));
      }
    } catch {
      toast.error(t('deleteAccount.serverError'));
    } finally {
      onClose();
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDeleteAccount}
      title={t('deleteAccount.modalTitle')}
      description={
        <p className="whitespace-pre-line">{t('deleteAccount.description')}</p>
      }
      confirmLabel={t('deleteAccount.confirmLabel')}
      cancelLabel={t('deleteAccount.cancelLabel')}
      confirmVariant="warn"
    />
  );
}
