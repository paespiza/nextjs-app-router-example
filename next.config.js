/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
      locales: ['en-US', 'en-GB', 'en-AU', 'en-CA', 'es-ES'],
      defaultLocale: 'en-US',
    },
  
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
  