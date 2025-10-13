import './globals.css';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${notoSans.className}`}>
        <header className="h-20">헤더</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
