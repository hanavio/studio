import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* الإضافات الجديدة للنشر على فايربيز */
  output: 'export', 
  images: {
    unoptimized: true, 
    /* الإعدادات القديمة بتاعتك للصور */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* الإعدادات القديمة لتجاهل الأخطاء */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;