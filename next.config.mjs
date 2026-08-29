/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/ptime",
        destination: "/PTime",
        permanent: true,
      },
      {
        source: "/Ptime",
        destination: "/PTime",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
