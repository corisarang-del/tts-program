/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // UTF-8 인코딩 보장
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
}

module.exports = nextConfig



