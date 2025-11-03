'use client';

import { signOut } from 'next-auth/react';
import Button from '../components/common/Button';
import AuthGuard from '../components/AuthGuard';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="p-6">
        <Button
          variant="warn"
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="cursor-pointer"
        >
          로그아웃
        </Button>
      </div>
    </AuthGuard>
  );
}
