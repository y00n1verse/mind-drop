'use client';

import { ChevronLeft } from 'lucide-react';
import useModal from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SettingsModals from './SettingsModals';
import { useTranslation } from 'react-i18next';
import SettingsButtons from './SettingsButtons';

export default function SettingsPanel() {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  const nicknameModal = useModal();
  const passwordModal = useModal();
  const socialAlertModal = useModal();
  const logoutModal = useModal();
  const deleteModal = useModal();

  const provider = session?.user?.provider;
  const isSocialLogin = provider && provider !== 'credentials';

  const handlePasswordClick = () => {
    if (isSocialLogin) socialAlertModal.openModal();
    else passwordModal.openModal();
  };

  return (
    <>
      <header className="flex items-center justify-center p-4 md:hidden">
        <button
          onClick={() => router.back()}
          className="absolute left-4 flex items-center justify-center rounded-md p-1 transition hover:bg-gray-100"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-medium">{t('mypage.myAccount')}</h1>
      </header>

      <SettingsButtons
        onOpenNickname={nicknameModal.openModal}
        onOpenPassword={handlePasswordClick}
        onOpenLogout={logoutModal.openModal}
        onOpenDelete={deleteModal.openModal}
      />

      <SettingsModals
        nicknameModal={nicknameModal}
        passwordModal={passwordModal}
        socialAlertModal={socialAlertModal}
        logoutModal={logoutModal}
        deleteModal={deleteModal}
        provider={provider}
      />
    </>
  );
}
