'use client';

import Spinner from '../loading';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Spinner variant="fade" />;
  }

  if (!session?.user) return null;

  return <>{children}</>;
}
