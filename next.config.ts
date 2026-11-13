import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The download route reads skill zips from disk; make sure they ship with it.
  outputFileTracingIncludes: {
    "/api/download": ["./content/skills/*.zip"],
  },
  // Old video descriptions link to /skills; send them to the skill on the home page.
  async redirects() {
    return [{ source: "/skills", destination: "/#local-ai-setup", permanent: false }];
  },
};

export default nextConfig;
