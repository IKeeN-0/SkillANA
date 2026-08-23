import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik0tosb0j8.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
