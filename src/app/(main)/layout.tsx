import NavBar from '@/app/components/layout/NavBar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="md:mt-18">{children}</main>
    </>
  );
}
