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

export const metadata: Metadata = {
    title: 'SosioMap',
    description:
        'A map based social media apps to share and discuss everything around you',
    manifest: '/manifest.json',
    icons: '/favicon.ico',
};

export const viewport: Viewport = {
    themeColor: '#cc0004',
};

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
