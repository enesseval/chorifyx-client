import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      domains: ["upload.wikimedia.org"], // Add the allowed domain here
   },
   /* other config options */
};

export default nextConfig;
