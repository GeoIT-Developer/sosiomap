import type { Metadata, Viewport } from 'next';
import '../globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/abeezee';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ThemeContext from '@/contexts/ThemeContext';
import { I18nProviderClient } from '@/locales/client';
import HistoryProvider from '@/contexts/HistoryContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextAuthProvider from '@/contexts/NextAuthContext';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';
import 'material-icons/iconfont/material-icons.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'react-virtualized/styles.css';

const HEAD = {
    TITLE: 'SosioMap',
    DESCRIPTION:
        'A map based social media apps to share and discuss everything around you~. Embark on a unique social journey with SosioMap, an innovative app designed to bring your local community closer than ever before. Immerse yourself in a dynamic and interactive map-based social media platform where the world around you becomes a canvas for sharing and discussing everything that matters.',
    ICONS: '/favicon.ico',
    IMAGE: '/img/logo/logo-512.png',
    URL: process.env.NEXT_PUBLIC_HOST_URL || '',
    MANIFEST: '/manifest.json',
};

export const metadata: Metadata = {
    metadataBase: new URL(HEAD.URL),
    title: HEAD.TITLE,
    description: HEAD.DESCRIPTION,
    manifest: HEAD.MANIFEST,
    icons: HEAD.ICONS,
    openGraph: {
        title: HEAD.TITLE,
        description: HEAD.DESCRIPTION,
        images: HEAD.IMAGE,
        url: HEAD.URL,
        type: 'profile',
    },
    twitter: {
        title: HEAD.TITLE,
        description: HEAD.DESCRIPTION,
        images: HEAD.IMAGE,
        card: 'summary_large_image',
    },
    alternates: {
        canonical: HEAD.URL,
    },
};

export const viewport: Viewport = {
    themeColor: '#cc0004',
};

const SCHEMA_ORG = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: HEAD.TITLE,
        url: HEAD.URL,
    },
];

export default function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}) {
    return (
        <html lang='en'>
            <body>
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(SCHEMA_ORG[0]),
                    }}
                />
                <GoogleAnalytics />
                <AppRouterCacheProvider>
                    <I18nProviderClient locale={locale}>
                        <NextAuthProvider>
                            <ThemeContext>
                                <HistoryProvider>
                                    {children}
                                    <ToastContainer />
                                </HistoryProvider>
                            </ThemeContext>
                        </NextAuthProvider>
                    </I18nProviderClient>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
