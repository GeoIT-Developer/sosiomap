/** @type {import('next').NextConfig} */

// Disable PWA for Development
// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
// });

const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXTAUTH_URL_IAM: process.env.NEXTAUTH_URL_IAM,
        NEXTAUTH_REALM_IAM: process.env.NEXTAUTH_REALM_IAM,
        NEXTAUTH_REDIRECT_URI: process.env.NEXTAUTH_REDIRECT_URI,
    },
};

module.exports = nextConfig;
// module.exports = withPWA(nextConfig);
