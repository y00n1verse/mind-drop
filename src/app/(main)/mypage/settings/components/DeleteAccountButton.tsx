'use client';

import { signOut } from 'next-auth/react';

export default function DeleteAccountButton() {
  const handleDeleteAccount = async () => {
    if (!confirm('정말 탈퇴하시겠습니까? 작성했던 모든 일기가 삭제됩니다.'))
      return;

    try {
      const res = await fetch('/api/auth/delete-account', { method: 'DELETE' });
      if (res.ok) {
        alert('회원 탈퇴가 완료되었습니다.');
        await signOut({ callbackUrl: '/signin' });
      } else {
        const data = await res.json();
        alert(data.error || '회원 탈퇴 중 오류가 발생했습니다.');
      }
    } catch {
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      onClick={handleDeleteAccount}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium text-[var(--color-warn-bg)] transition hover:bg-gray-100"
    >
      회원 탈퇴
    </button>
  );
}
