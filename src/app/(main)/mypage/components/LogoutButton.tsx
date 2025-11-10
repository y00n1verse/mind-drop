'use client';

import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';
import useModal from '@/app/hooks/useModal';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@/app/components/common/ConfirmModal';

export default function LogoutButton() {
  const { t } = useTranslation();

  const {
    isOpen: isConfirmOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/signin' });
    } catch {
      toast.error(t('logout.fail'));
    } finally {
      closeConfirmModal();
    }
  };

  return (
    <>
      <button
        onClick={openConfirmModal}
        className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:shadow-md md:hover:bg-gray-100 lg:p-18"
      >
        <div className="flex items-center justify-start gap-2 md:flex-col md:justify-center">
          <LogOutIcon className="hidden text-gray-700 md:block md:h-28 md:w-28 lg:h-32 lg:w-32" />
          <span className="block md:mt-2 md:text-lg md:font-semibold md:text-gray-600">
            {t('mypage.logOut')}
          </span>
        </div>
      </button>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirmModal}
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
