/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const API_HOST = process.env.NEXT_PUBLIC_ENV_API_HOST
const API_PORT = process.env.NEXT_PUBLIC_ENV_API_PORT
const API_BASE_URL = `${API_HOST}:${API_PORT}`

const AUTH_HOST = process.env.NEXT_PUBLIC_ENV_AUTH_HOST
const AUTH_PORT = process.env.NEXT_PUBLIC_ENV_AUTH_PORT
const AUTH_BASE_URL = `${AUTH_HOST}:${AUTH_PORT}`

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page2',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/page2/:path*',
        destination: `${API_BASE_URL}/page2/:path*`,
      },
      {
        source: '/user/:path*',
        destination: `${API_BASE_URL}/user/:path*`,
      },
      {
        source: '/layout/:path*',
        destination: `${API_BASE_URL}/layout/:path*`,
      },
      {
        source: '/realms/:path*',
        destination: `${AUTH_BASE_URL}/realms/:path*`,
      },
    ]
  },
  reactStrictMode: true,

  swcMinify: true,

  // assetPrefix: '.',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  i18n,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '',
  //       port: '',
  //       pathname: '',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
