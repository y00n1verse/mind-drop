'use client';

import LogoutModal from './LogoutModal';
import { UseModalReturn } from '@/app/hooks/useModal';
import DeleteAccountModal from './DeleteAccountModal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeNicknameModal from './ChangeNicknameModal';
import SocialLoginAlertModal from './SocialLoginAlertModal';

interface SettingsModalsProps {
  nicknameModal: UseModalReturn;
  passwordModal: UseModalReturn;
  socialAlertModal: UseModalReturn;
  logoutModal: UseModalReturn;
  deleteModal: UseModalReturn;
  provider?: string;
}

export default function SettingsModals({
  nicknameModal,
  passwordModal,
  socialAlertModal,
  logoutModal,
  deleteModal,
  provider,
}: SettingsModalsProps) {
  return (
    <>
      <ChangeNicknameModal
        isOpen={nicknameModal.isOpen}
        onClose={nicknameModal.closeModal}
      />
      <ChangePasswordModal
        isOpen={passwordModal.isOpen}
        onClose={passwordModal.closeModal}
      />
      <SocialLoginAlertModal
        isOpen={socialAlertModal.isOpen}
        onClose={socialAlertModal.closeModal}
        provider={provider}
      />
      <LogoutModal
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.closeModal}
      />
      <DeleteAccountModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
      />
    </>
  );
}
