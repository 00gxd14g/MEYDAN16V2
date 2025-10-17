/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion", "lucide-react"],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  // Ensure Next uses the frontend directory as the tracing root
  outputFileTracingRoot: process.cwd(),
  async rewrites() {
    return [
      {
        // Rewrite any non-asset path to "/" to avoid 404 on refresh
        source: '/:path((?!_next|api|assets|styles|scripts|favicon\\.ico|sw\\.js|manifest\\.webmanifest|.*\\..*).*)',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
