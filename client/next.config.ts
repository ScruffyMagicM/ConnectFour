import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Disable source maps in production for smaller image size
  productionBrowserSourceMaps: false,
  
  // Optional: Add other optimizations
  swcMinify: true,
  
  // If you're using environment variables, make sure they're available at build time
  env: {
    // Add any public environment variables here
  },
};

export default nextConfig;
