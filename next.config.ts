// next.config.ts
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  // ⚠️ REMOVE `serverActions: true` from experimental — it’s invalid now
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

export default withPWA(pwaConfig)(nextConfig);
