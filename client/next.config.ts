import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable Turbopack by not enabling the experimental flag
  // and using the default webpack configuration
  experimental: {
    // Add any experimental features here if needed
  }
};

export default nextConfig;
