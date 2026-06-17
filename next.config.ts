import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.brambleberry.com" }
    ]
  },
  trailingSlash: true,
  typedRoutes: false,
  outputFileTracingExcludes: {
    "*": ["node_modules/**", ".next/**", "out/**"]
  },
  experimental: {
    cpus: 2,
    memoryBasedWorkersCount: false,
    parallelServerBuildTraces: false,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 4
  }
};

export default nextConfig;
