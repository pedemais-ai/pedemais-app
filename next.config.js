/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            {
                protocol: 'https',
                hostname: 'googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
            },
        ],
    },
}

module.exports = nextConfig
