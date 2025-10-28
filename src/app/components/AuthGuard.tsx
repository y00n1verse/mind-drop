'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>로딩 중...</p>;
  if (!session?.user) redirect('/signin');

  return <>{children}</>;
}
