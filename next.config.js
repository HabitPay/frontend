/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "habitpay.s3.ap-northeast-2.amazonaws.com",
        pathname: "/profiles/**",
      },
    ],
  },
};

module.exports = nextConfig;
