'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from '@/app/components/layout/NavBar';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showNav, setShowNav } = useLayoutStore();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname.startsWith('/calendar') ||
      pathname.startsWith('/report') ||
      pathname.startsWith('/mypage')
    ) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [pathname]);

  return (
    <>
      {showNav && <NavBar />}
      <main>{children}</main>
    </>
  );
}
