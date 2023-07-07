const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.googleusercontent.com' },
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);
