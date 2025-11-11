'use client';

import NavBar from '@/app/components/layout/NavBar';
import { useLayoutStore } from '@/stores/useLayoutStore';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showNav = useLayoutStore((s) => s.showNav);
  return (
    <>
      {showNav && <NavBar />}
      <main>{children}</main>
    </>
  );
}
