/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    images: {
        unoptimized: true,
        // Allow locally uploaded images from /public/uploads/ to be served by Next.js Image
        localPatterns: [
            {
                pathname: '/uploads/**',
                search: '',
            },
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                // Allow images served from the production domain
                protocol: 'https',
                hostname: 'panoralink.com',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
