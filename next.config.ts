// next.config.ts
import withPWA from "next-pwa";

const baseConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true as true, // ✅ Fixes TypeScript red underline
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  ...baseConfig,
});