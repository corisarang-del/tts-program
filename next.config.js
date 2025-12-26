/** @type {import('next').NextConfig} */

// 배포 대상에 따른 설정
const isGitHubPages = process.env.DEPLOYMENT_TARGET === 'github-pages';

const nextConfig = {
  // GitHub Pages는 정적 빌드, Vercel은 동적 빌드
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/tts-program',
    images: {
      unoptimized: true,
    },
  }),
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



