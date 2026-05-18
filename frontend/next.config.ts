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
      // Legacy direct MP4 paths (not in Git) → S3 stream API
      {
        source: "/LearnX sms video final 1.mp4",
        destination: "/api/s3-video/learnx",
        permanent: false,
      },
      {
        source: "/LearnX sms video final 2.mp4",
        destination: "/api/s3-video/learnx",
        permanent: false,
      },
      {
        source: "/LMS only Video Presentation.mp4",
        destination: "/api/s3-video/lms",
        permanent: false,
      },
      {
        source: "/LMS only Video Presentation 1.mp4",
        destination: "/api/s3-video/lms",
        permanent: false,
      },
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
