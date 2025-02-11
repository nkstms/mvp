import Lines from '@/components/lines';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | NKS TMS',
    default: 'NKS TMS',
  },
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
  authors: [{ name: 'NKS' }],
  icons: {
    shortcut: { url: '../favicon.ico' },
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute hidden opacity-50 ltr:-left-16 rtl:-right-16 -top-10 md:block">
        <Lines />
      </div>

      <div className="absolute hidden -rotate-180 opacity-50 ltr:-right-16 rtl:-left-16 -bottom-10 md:block">
        <Lines />
      </div>
      {children}
    </div>
  );
}
