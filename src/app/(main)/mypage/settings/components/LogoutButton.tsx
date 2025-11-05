'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signin' })}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100"
    >
      로그아웃
    </button>
  );
}
