// import createNextIntlPlugin from 'next-intl/plugin';
 
// const withNextIntl = createNextIntlPlugin();
 
// /** @type {import('next').NextConfig} */
// module.exports = {
//     reactStrictMode: true,
//     images: {
//       domains: ['autoapi.dezinfeksiyatashkent.uz'],
//     },
//   }
  
// const nextConfig = {};
//  // next.config.js
//  export default withNextIntl(nextConfig);

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['autoapi.dezinfeksiyatashkent.uz'],
  },
};

// Use withNextIntl to wrap the entire configuration
export default withNextIntl(nextConfig);
