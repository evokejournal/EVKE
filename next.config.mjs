/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  output: 'standalone',  // Changed from 'export' to 'standalone' for server actions support
  distDir: 'out',    // Specify the output directory
}

export default nextConfig
