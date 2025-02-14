import Lines from '@/components/lines';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | NKS TMS',
    default: 'NKS TMS',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen py-16 lg:py-10">
      <div className="relative">
        <div className="absolute hidden opacity-50 ltr:-left-16 rtl:-right-16 -top-10 md:block">
          <Lines />
        </div>

        <div className="absolute hidden -rotate-180 opacity-50 ltr:-right-16 rtl:-left-16 -bottom-10 md:block">
          <Lines />
        </div>
        {children}
      </div>
    </div>
  );
}
