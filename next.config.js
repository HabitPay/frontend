/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "habitpay-public.s3.ap-northeast-2.amazonaws.com",
        pathname: "/profiles/**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = removeImports({
  ...nextConfig,
});
