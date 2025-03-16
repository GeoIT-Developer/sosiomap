import withSerwistInit from '@serwist/next';

// const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline';
//     style-src 'self' 'unsafe-inline';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `;

const revision = crypto.randomUUID();
const withSerwist = withSerwistInit({
    cacheOnNavigation: true,
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
    additionalPrecacheEntries: [{ url: '/[locale]/~offline', revision }],
});

const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_URL_IAM: process.env.NEXTAUTH_URL_IAM,
        NEXTAUTH_REALM_IAM: process.env.NEXTAUTH_REALM_IAM,
        NEXTAUTH_REDIRECT_URI: process.env.NEXTAUTH_REDIRECT_URI,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                    // {
                    //     key: 'Content-Security-Policy',
                    //     value: cspHeader.replace(/\n/g, ''),
                    // },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer-when-downgrade',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(self), microphone=(self), camera=(self), fullscreen=(self), payment=(self), vr=(), xr-spatial-tracking=(self)',
                    },
                ],
            },
        ];
    },
};

export default withSerwist({
    ...nextConfig,
});
