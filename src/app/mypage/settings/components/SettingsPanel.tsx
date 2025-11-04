'use client';

import LogoutButton from './LogoutButton';
import useModal from '@/app/hooks/useModal';
import { useSession } from 'next-auth/react';
import DeleteAccountButton from './DeleteAccount';
import ChangePasswordModal from './ChangePasswordModal';
import ChangePasswordButton from './ChangePasswordButton';

export default function SettingsPanel() {
  const { data: session } = useSession();
  const { isOpen, openModal, closeModal } = useModal();

  const provider = session?.user?.provider;
  const isSocialLogin = provider && provider !== 'credentials';

  return (
    <div className="flex flex-col gap-4">
      {!isSocialLogin ? (
        <ChangePasswordButton onClick={openModal} />
      ) : (
        <div>
          {provider === 'google' && 'Google 로그인 계정'}
          {provider === 'kakao' && 'Kakao 로그인 계정'}
          {provider === 'naver' && 'Naver 로그인 계정'}
        </div>
      )}

      <LogoutButton />
      <DeleteAccountButton />
      <ChangePasswordModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
