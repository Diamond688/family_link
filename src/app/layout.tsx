import type { Metadata, Viewport } from 'next';
import { Noto_Sans_SC, Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '万家灯火 - 传承家族记忆',
  description: '记录与传承家族珍贵记忆的平台',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${manrope.variable}`} suppressHydrationWarning={true}>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#f0f0f0] flex justify-center items-start min-h-screen font-sans" suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
