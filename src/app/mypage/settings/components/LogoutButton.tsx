'use client';

import { signOut } from 'next-auth/react';
import Button from '@/app/components/common/Button';

export default function LogoutButton() {
  return (
    <Button
      variant="warn"
      onClick={() => signOut({ callbackUrl: '/signin' })}
      className="cursor-pointer"
    >
      로그아웃
    </Button>
  );
}
