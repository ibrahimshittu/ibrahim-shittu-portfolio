/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features for better performance
    // optimizeCss: true,
    webVitalsAttribution: ["CLS", "LCP"],
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.canva.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Compress responses
  compress: true,

  // Generate static files for better SEO
  trailingSlash: false,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=43200",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // Redirect www to non-www and handle query parameters
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.ibrahimshittu.com",
          },
        ],
        destination: "https://ibrahimshittu.com/:path*",
        permanent: true,
      },
      // Redirect URLs with ref parameter to clean URLs
      {
        source: "/",
        has: [
          {
            type: "query",
            key: "ref",
          },
        ],
        destination: "/",
        permanent: true,
      },
      // Redirect broken blog URLs to correct ones
      {
        source: "/blog/from-civil-engineering-to-software",
        destination: "/blog/from-civil-engineering-to-software-development",
        permanent: true,
      },
      {
        source: "/blog/predictive-analytics-energy-optimization",
        destination: "/blog/using-predictive-analytics-for-energy-optimization",
        permanent: true,
      },
      // Redirect old URLs without trailing dashes
      {
        source: "/blog/building-ai-agents-legal-tech",
        destination: "/blog/building-ai-agents-for-legal-tech",
        permanent: true,
      },
      {
        source: "/blog/deploying-fastapi-azure-container",
        destination: "/blog/deploying-fastapi-azure-container-apps",
        permanent: true,
      },
      {
        source: "/blog/scaling-cad-education-fabrio",
        destination: "/blog/scaling-cad-education-at-fabrio",
        permanent: true,
      },
      {
        source: "/blog/speaking-bim-harambee-africa-2020",
        destination: "/blog/speaking-at-bim-harambee-africa-2020",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
