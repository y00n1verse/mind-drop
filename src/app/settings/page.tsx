'use client';

import { signOut } from 'next-auth/react';
import Button from '../components/common/Button';
import AuthGuard from '../components/AuthGuard';

export default function SettingsPage() {
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
    } catch (e) {
      console.error(e);
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <AuthGuard>
      <div className="flex flex-col gap-4">
        <Button
          variant="warn"
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="cursor-pointer"
        >
          로그아웃
        </Button>
        <Button
          variant="warn"
          onClick={handleDeleteAccount}
          className="cursor-pointer"
        >
          회원 탈퇴
        </Button>
      </div>
    </AuthGuard>
  );
}
