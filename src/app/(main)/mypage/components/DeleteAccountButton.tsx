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
        toast.success('회원 탈퇴 완료', {
          description: '다음에 또 만나요!',
        });
        setTimeout(() => {
          signOut({ callbackUrl: '/signin' });
        }, 2000);
      } else {
        toast.error('회원 탈퇴 실패 ⚠️');
      }
    } catch {
      toast.error('서버 오류 ⚠️');
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
        title="회원 탈퇴"
        description={
          <p>
            정말 탈퇴하시겠어요?
            <br />
            작성했던 모든 일기가 삭제돼요.
          </p>
        }
        confirmLabel="탈퇴"
        cancelLabel="취소"
        confirmVariant="warn"
      />
    </>
  );
}
