'use client';

import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@/app/components/common/ConfirmModal';
import { useDiaryStore } from '@/stores/useDiaryStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const { reset } = useDiaryStore();

  const handleLogout = async () => {
    try {
      reset();
      await signOut({ callbackUrl: '/signin' });
    } catch {
      toast.error(t('logout.fail'));
    } finally {
      onClose();
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleLogout}
      title={t('logout.modalTitle')}
      description={
        <p className="whitespace-pre-line">{t('logout.description')}</p>
      }
      confirmLabel={t('logout.confirmLabel')}
      cancelLabel={t('logout.cancelLabel')}
      confirmVariant="warn"
    />
  );
}
