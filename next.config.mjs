/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                protocol: "http",
            },
            {
                hostname: "pixelance-production.up.railway.app",
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;
