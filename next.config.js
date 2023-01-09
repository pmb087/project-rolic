/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      's3.mangoplate.com',
      'mp-seoul-image-production-s3.mangoplate.com',
      'img.siksinhot.com'
    ]
  }
};

module.exports = nextConfig;
