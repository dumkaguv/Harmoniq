// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/audius/:path*",
        destination: "https://api.audius.co/:path*",
      },
    ];
  },
};

export default nextConfig;
