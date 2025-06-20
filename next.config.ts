import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "*", // Allow images from all domains
         },
      ],
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
