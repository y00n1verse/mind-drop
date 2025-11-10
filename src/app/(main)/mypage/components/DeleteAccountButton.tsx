'use client';

import { toast } from 'sonner';
import { UserX } from 'lucide-react';
import { signOut } from 'next-auth/react';
import useModal from '@/app/hooks/useModal';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@/app/components/common/ConfirmModal';

export default function DeleteAccountButton() {
  const { t } = useTranslation();

  const {
    isOpen: isConfirmOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

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
      closeConfirmModal();
    }
  };

  return (
    <>
      <button
        onClick={openConfirmModal}
        className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium text-[var(--color-warn-bg)] transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:shadow-md md:hover:bg-gray-100 lg:p-18"
      >
        <div className="flex items-center justify-start gap-2 md:flex-col md:justify-center">
          <UserX className="hidden text-[var(--color-warn-bg)] md:block md:h-28 md:w-28 lg:h-32 lg:w-32" />
          <span className="block md:mt-2 md:text-lg md:font-semibold md:text-[var(--color-warn-bg)]">
            {t('mypage.deleteAccount')}
          </span>
        </div>
      </button>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDeleteAccount}
        title={t('deleteAccount.modalTitle')}
        description={
          <p className="whitespace-pre-line">
            {t('deleteAccount.description')}
          </p>
        }
        confirmLabel={t('deleteAccount.confirmLabel')}
        cancelLabel={t('deleteAccount.cancelLabel')}
        confirmVariant="warn"
      />
    </>
  );
}
