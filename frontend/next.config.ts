import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
