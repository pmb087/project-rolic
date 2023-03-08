const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      's3.mangoplate.com',
      'mp-seoul-image-production-s3.mangoplate.com',
      'img.siksinhot.com',
      'lh3.googleusercontent.com'
    ]
  }
};

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'components'),
      '@/utils': path.resolve(__dirname, 'utils'),
      '@/styles': path.resolve(__dirname, 'styles')
    };
    return config;
  }
};
