'use client';

import { toast } from 'sonner';
import { AxiosError } from 'axios';
import instance from '@/lib/instance';
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
      await instance.delete('/auth/delete-account');
      toast.success(t('deleteAccount.success'), {
        description: t('deleteAccount.successDescription'),
      });
      setTimeout(() => {
        signOut({ callbackUrl: '/signin' });
      }, 2000);
    } catch (e) {
      const error = e as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || t('deleteAccount.serverError');
      toast.error(message);
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
