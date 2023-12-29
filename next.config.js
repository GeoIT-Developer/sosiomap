/** @type {import('next').NextConfig} */

// Disable PWA for Development
// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
// });

const nextConfig = { reactStrictMode: false };

module.exports = nextConfig;
// module.exports = withPWA(nextConfig);
