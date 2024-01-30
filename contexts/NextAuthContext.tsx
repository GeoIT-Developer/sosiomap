'use client';

import { ReactChildrenProps } from '@/types/react-children.props';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { COOKIE } from '@/utils/constant';

function AuthProvider({ children }: ReactChildrenProps) {
    const session = useSession();

    useEffect(() => {
        if (session?.data?.error === 'RefreshAccessTokenError') {
            // Force sign in to resolve the error
            signIn('keycloak');
        }
        if (session.data?.access_token) {
            setCookie(COOKIE.TOKEN, session.data?.access_token);
        }

        // Update the session when idle or keep use the main app
        let timerId: NodeJS.Timeout | undefined;
        if (session.data?.expires_at) {
            const willExpiresIn = Math.abs(
                session.data?.expires_at - Math.floor(Date.now() / 1000),
            );
            timerId = setTimeout(() => {
                session.update();
            }, willExpiresIn * 1000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [session]);
    return <>{children}</>;
}

export default function NextAuthProvider({ children }: ReactChildrenProps) {
    return (
        <SessionProvider>
            <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
    );
}
