/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // or restrict to *.builder.io for stricter setup
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  