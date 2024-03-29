const path = require("path");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3333/api/:path*",
      },
      {
        source: "/trpc/:path*",
        destination: "http://localhost:3333/trpc/:path*",
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
