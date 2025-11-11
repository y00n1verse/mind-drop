'use client';

import LogoutButton from './LogoutButton';
import SendBugButton from './SendBugButton';
import DeleteAccountButton from './DeleteAccountButton';
import ChangeLanguageButton from './ChangeLanguageButton';
import ChangeNicknameButton from './ChangeNicknameButton';
import ChangePasswordButton from './ChangePasswordButton';

interface SettingsButtonsProps {
  onOpenNickname: () => void;
  onOpenPassword: () => void;
  onOpenLogout: () => void;
  onOpenDelete: () => void;
}

export default function SettingsButtons({
  onOpenNickname,
  onOpenPassword,
  onOpenLogout,
  onOpenDelete,
}: SettingsButtonsProps) {
  return (
    <div className="grid md:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 lg:p-8">
      <ChangeNicknameButton onClick={onOpenNickname} />
      <ChangePasswordButton onClick={onOpenPassword} />
      <ChangeLanguageButton />
      <SendBugButton />
      <LogoutButton onClick={onOpenLogout} />
      <DeleteAccountButton onClick={onOpenDelete} />
    </div>
  );
}
