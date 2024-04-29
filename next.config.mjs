/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ruq5wrpxywtahsfm.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
