/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}, // ✅ disables Turbopack and uses Webpack instead
  },
};

export default nextConfig;
