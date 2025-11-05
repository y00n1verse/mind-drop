'use client';

import { ChevronLeft } from 'lucide-react';
import useModal from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DeleteAccountButton from './DeleteAccount';
import ChangeNicknameModal from './ChangeNicknameModal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangePasswordButton from './ChangePasswordButton';
import ChangeNicknameButton from './ChangeNicknameButton';

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

  const handleCancel = () => {
    router.push('/mypage');
  };

  const provider = session?.user?.provider;
  const isSocialLogin = provider && provider !== 'credentials';

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

      <div className="flex w-full flex-col items-start gap-1">
        <ChangeNicknameButton onClick={openNicknameModal} />

        {!isSocialLogin ? (
          <ChangePasswordButton onClick={openPasswordModal} />
        ) : (
          <div className="w-full rounded-sm px-5 py-3 text-left text-base font-medium text-gray-600">
            {provider === 'google' &&
              'Google 로그인은 비밀번호를 변경할 수 없어요'}
            {provider === 'kakao' &&
              'Kakao 로그인은 비밀번호를 변경할 수 없어요'}
            {provider === 'naver' &&
              'Naver 로그인은 비밀번호를 변경할 수 없어요'}
          </div>
        )}
        <DeleteAccountButton />
        <ChangePasswordModal
          isOpen={isPasswordOpen}
          onClose={closePasswordModal}
        />
        <ChangeNicknameModal
          isOpen={isNicknameOpen}
          onClose={closeNicknameModal}
        />
      </div>
    </>
  );
}
