import './globals.css';
import I18nProvider from './i18n-wrapper';
import { Noto_Sans } from 'next/font/google';
import SessionWrapper from './session-wrapper';
import { Metadata } from 'next';

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
      <body className={notoSans.className}>
        <I18nProvider>
          <SessionWrapper>{children}</SessionWrapper>
        </I18nProvider>
      </body>
    </html>
  );
}
