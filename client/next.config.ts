import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Disable source maps in production for smaller image size
  productionBrowserSourceMaps: false,
  
  // Optional: Add other optimizations
  swcMinify: true,
};

export default nextConfig;
