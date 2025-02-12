import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Allow Google user profile images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
