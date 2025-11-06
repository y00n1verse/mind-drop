'use client';

import { ChevronLeft } from 'lucide-react';
import useModal from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeleteAccountButton from './DeleteAccountButton';
import ChangeNicknameModal from './ChangeNicknameModal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangePasswordButton from './ChangePasswordButton';
import ChangeNicknameButton from './ChangeNicknameButton';
import SocialLoginAlertModal from './SocialLoginAlertModal';
import LogoutButton from './LogoutButton';
import SendBugButton from './SendBugButton';

export default function SettingsPanel() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    isOpen: isPasswordOpen,
    openModal: openPasswordModal,
    closeModal: closePasswordModal,
  } = useModal();

  const {
    isOpen: isNicknameOpen,
    openModal: openNicknameModal,
    closeModal: closeNicknameModal,
  } = useModal();

  const {
    isOpen: isAlertOpen,
    openModal: openAlertModal,
    closeModal: closeAlertModal,
  } = useModal();

  const handleCancel = () => {
    router.push('/mypage');
  };

  const provider = session?.user?.provider;
  const isSocialLogin = provider && provider !== 'credentials';

  const handlePasswordClick = () => {
    if (isSocialLogin) openAlertModal();
    else openPasswordModal();
  };

  return (
    <>
      <header className="relative flex items-center justify-center p-4 md:hidden">
        <button
          onClick={handleCancel}
          className="absolute left-4 flex items-center justify-center rounded-full p-1 transition hover:bg-gray-100"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-medium">내 계정</h1>
      </header>

      <div className="flex w-full flex-col items-start gap-1 md:mt-38 md:flex-row md:items-center md:justify-center md:gap-12 md:p-6 lg:mt-60 lg:gap-20 lg:p-8">
        <ChangeNicknameButton onClick={openNicknameModal} />
        <ChangePasswordButton onClick={handlePasswordClick} />
        <SendBugButton />
        <LogoutButton />
        <DeleteAccountButton />

        <ChangePasswordModal
          isOpen={isPasswordOpen}
          onClose={closePasswordModal}
        />
        <ChangeNicknameModal
          isOpen={isNicknameOpen}
          onClose={closeNicknameModal}
        />
        <SocialLoginAlertModal
          isOpen={isAlertOpen}
          onClose={closeAlertModal}
          provider={provider}
        />
      </div>
    </>
  );
}
