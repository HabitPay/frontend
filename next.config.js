/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "habitpay.s3.ap-northeast-2.amazonaws.com",
        pathname: "/profiles/**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
