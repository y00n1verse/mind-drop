import './globals.css';
import { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import SessionWrapper from './session-wrapper';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Mind Drop',
    template: '%s | Mind Drop',
  },
  description: '하루의 마음을 한 방울씩 기록하며 비워내는 감정 다이어리',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${notoSans.className}`}>
        <SessionWrapper>
          <header className="h-20">헤더</header>
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
