/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ✅ disables Turbopack and uses Webpack instead
  },
};

export default nextConfig;
