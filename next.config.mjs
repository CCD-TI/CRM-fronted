/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'export', // 👈 ¡Esto es lo más importante para exportar!

  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: ""
      },
      {
        protocol: "https",
        hostname: "pub-9d2abfa175714e64aed33b90722a9fd5.r2.dev", // nuevo dominio añadido
        port: ""
      }
    ]
  }
};

export default nextConfig;
