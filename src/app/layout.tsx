import './globals.css';
import I18nProvider from './i18n-wrapper';
import { Noto_Sans } from 'next/font/google';
import SessionWrapper from './session-wrapper';
import { Metadata } from 'next';
import ResponsiveToaster from './components/common/ResponsiveToaster';

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
  openGraph: {
    title: 'Mind Drop',
    description: '하루의 마음을 한 방울씩 기록하며 비워내는 감정 다이어리',
    url: 'https://jiyoon-mind-drop.vercel.app',
    siteName: 'Mind Drop',
    images: [
      {
        url: 'https://jiyoon-mind-drop.vercel.app/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mind Drop thumbnail',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
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
          <ResponsiveToaster />
        </I18nProvider>
      </body>
    </html>
  );
}
