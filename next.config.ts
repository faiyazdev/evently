import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Move allowedDevOrigins out of experimental and into the root level */
  allowedDevOrigins: [
    "kit-diligent-juliet.ngrok-free.dev",
    "https://kit-diligent-juliet.ngrok-free.dev",
  ],

  // Any other standard configurations go here
};

export default nextConfig;
