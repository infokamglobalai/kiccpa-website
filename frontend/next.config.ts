import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
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
      { source: "/services/technology-ai/ai-automation", destination: "/services/ai-automation", permanent: false },
      { source: "/services/technology-ai/software-app-development", destination: "/services/software-development", permanent: false },
      { source: "/services/technology-ai/cloud-data-solutions", destination: "/services/cloud-data", permanent: false },
      { source: "/services/technology-ai/it-support-cybersecurity", destination: "/services/it-support-cybersecurity", permanent: false },
      { source: "/services/business-outsourcing/customer-service-support", destination: "/services/customer-support", permanent: false },
      { source: "/services/business-outsourcing/sales-lead-generation", destination: "/services/sales-lead-generation", permanent: false },
      { source: "/services/business-outsourcing/back-office-bpo", destination: "/services/back-office-bpo", permanent: false },
      { source: "/services/business-outsourcing/virtual-assistants-crm", destination: "/services/virtual-assistants-crm", permanent: false },
      { source: "/services/hr-recruitment/nursing", destination: "/services/healthcare-recruitment", permanent: false },
      { source: "/services/hr-recruitment/medical-healthcare", destination: "/services/healthcare-recruitment", permanent: false },
      { source: "/services/hr-recruitment/hotels-hospitality", destination: "/services/hospitality-recruitment", permanent: false },
      { source: "/services/hr-recruitment/oil-gas", destination: "/services/oil-gas-recruitment", permanent: false },
      { source: "/services/hr-recruitment/construction", destination: "/services/construction-recruitment", permanent: false },
      { source: "/services/hr-recruitment/manufacturing", destination: "/services/manufacturing-recruitment", permanent: false },
      { source: "/services/it-digital-solutions", destination: "/services/technology-ai", permanent: false },
      { source: "/services/cloud-devops", destination: "/services/cloud-data", permanent: false },
      { source: "/services/bot-offshore-delivery", destination: "/services/business-outsourcing", permanent: false },
      { source: "/services/business-process-outsourcing", destination: "/services/back-office-bpo", permanent: false },
    ];
  },
  images: {
    /** Serve /public images directly — avoids Amplify _next/image optimizer failures */
    unoptimized: true,
    qualities: [75, 100],
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
