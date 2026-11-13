import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The download route reads skill zips from disk; make sure they ship with it.
  outputFileTracingIncludes: {
    "/api/download": ["./content/skills/*.zip"],
  },
};

export default nextConfig;
