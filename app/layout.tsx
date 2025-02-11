import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Public_Sans } from 'next/font/google';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NKS TMS',
  description: 'MVP TMS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light scroll-smooth group"
      data-layout="vertical"
      data-sidebar="light"
      data-sidebar-size="lg"
      data-mode="light"
      data-topbar="light"
      data-skin="default"
      data-navbar="sticky"
      data-content="fluid"
      dir="ltr"
    >
      <body
        className={`flex items-center justify-center min-h-screen py-16 lg:py-10 bg-slate-50 dark:bg-zink-800 dark:text-zink-100 ${publicSans.className} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
