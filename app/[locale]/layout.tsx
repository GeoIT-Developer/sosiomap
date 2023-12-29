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

export const metadata: Metadata = {
    title: 'SosioMap',
    description:
        'SosioMap is an application that combine social media to fix the social problems',
    manifest: '/manifest.json',
    icons: '/favicon.ico',
};

export const viewport: Viewport = {
    themeColor: 'red',
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
