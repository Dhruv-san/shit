/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  images: {
    domains: ['newsapi.org', 'cloudinary.com', 'images.unsplash.com'],
  },
  experimental: {
    optimizeFonts: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'https://jdhikwjcjpnrsgpoooom.auth.ap-south-1.nhost.run/auth/:path*',
      },
    ];
  }
}

module.exports = nextConfig
