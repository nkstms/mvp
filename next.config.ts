import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.facebook.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'graph.facebook.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
