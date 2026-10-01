import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // The site used to live under /en and /pt. Keep old links working.
    return [
      { source: "/:lang(en|pt)", destination: "/", permanent: true },
      { source: "/:lang(en|pt)/work", destination: "/#work", permanent: true },
      { source: "/:lang(en|pt)/work/:slug", destination: "/work/:slug", permanent: true },
      { source: "/:lang(en|pt)/credentials", destination: "/credentials", permanent: true },
      { source: "/:lang(en|pt)/:rest*", destination: "/", permanent: true },
      { source: "/work", destination: "/#work", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default config;
