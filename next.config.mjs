/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't let lint warnings block a production build; run `npm run lint` separately.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
