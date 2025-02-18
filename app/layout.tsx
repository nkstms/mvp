import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Public_Sans } from 'next/font/google';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';

const publicSans = Public_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NKS TMS',
  description: 'MVP TMS',
  authors: [{ name: 'NKS' }],
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
      data-topbar="light"
      data-skin="default"
      data-navbar="sticky"
      data-content="fluid"
      dir="ltr"
      suppressHydrationWarning
    >
      <body className={`${publicSans.className} bg-slate-50 dark:bg-zink-800 dark:text-zink-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
