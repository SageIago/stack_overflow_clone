// This file is used to configure the Next.js build process.
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    }, 
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
           {
            protocol: "https",
            hostname: "img.clerk.com",
            port: "",
            pathname: "/**"
           }
        ]
    }
};

export default nextConfig;
