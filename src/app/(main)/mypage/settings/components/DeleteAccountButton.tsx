'use client';

import { UserX } from 'lucide-react';
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
      className="w-full cursor-pointer rounded-sm p-3 px-5 text-left text-base font-medium text-[var(--color-warn-bg)] transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:text-gray-600 md:shadow-md md:hover:bg-gray-100 lg:p-18"
    >
      <div className="flex items-center justify-start gap-2 md:flex-col md:justify-center">
        <UserX className="hidden text-gray-700 md:block md:h-28 md:w-28 lg:h-32 lg:w-32" />
        <span className="block md:mt-2 md:text-lg md:font-semibold md:text-gray-600">
          회원 탈퇴
        </span>
      </div>
    </button>
  );
}
