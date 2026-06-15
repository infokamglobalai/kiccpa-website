import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  /**
   * Do not rewrite `/api/*` to Express. That would steal `/api/auth/*` from NextAuth and break admin login.
   * Express is reached only via Route Handlers: `app/api/[...path]` and `app/uploads/[...path]`.
   */
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:path*", destination: "/", permanent: false },
    ];
  },
  images: {
    /** Serve /public images directly — avoids Amplify _next/image optimizer failures */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
