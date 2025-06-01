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
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  output: 'standalone',
  distDir: 'out',
  env: {
    EVKE_PROJECT_ID: process.env.EVKE_PROJECT_ID,
    EVKE_CLIENT_EMAIL: process.env.EVKE_CLIENT_EMAIL,
    EVKE_PRIVATE_KEY: process.env.EVKE_PRIVATE_KEY,
    EVKE_DATABASE_URL: process.env.EVKE_DATABASE_URL
  }
}

export default nextConfig
