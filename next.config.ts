// next.config.ts
import withPWA from "next-pwa";

const baseConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true, // ✅ This is allowed in Next.js 14+
  },
};

// ✅ Final export: apply PWA config
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(baseConfig); // 👈 No red lines here