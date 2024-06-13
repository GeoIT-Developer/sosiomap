import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

declare module 'next-auth/jwt' {
    interface JWT {
        access_token?: string;
        expires_at: number;
        refresh_token?: string;
        error?: 'RefreshAccessTokenError';
    }
}

const KEYCLOAK_BASE = `${process.env.NEXTAUTH_URL_IAM}realms/${process.env.NEXTAUTH_REALM_IAM}`;

const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || '',
            clientSecret: process.env.NEXTAUTH_SECRET || '',
            issuer: KEYCLOAK_BASE,
            authorization: { params: { scope: 'openid offline_access' } },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                // Save the access token and refresh token in the JWT on the initial login
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.refresh_token = account.refresh_token;
                // use account.expires_at for default value, if null, set the expires at in 5 minutes
                token.expires_at =
                    account.expires_at ||
                    Math.floor(Date.now() / 1000 + 5 * 60);
                return { ...token };
            } else if (Date.now() < token.expires_at * 1000) {
                // If the access token has not expired yet, return it
                return token;
            } else {
                // If the access token has expired, try to refresh it
                try {
                    // We need the `token_endpoint`.
                    const refreshTokenUrl = `${KEYCLOAK_BASE}/protocol/openid-connect/token`;
                    const response = await fetch(refreshTokenUrl, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            client_id: process.env.NEXTAUTH_CLIENT_ID || '',
                            client_secret: process.env.NEXTAUTH_SECRET || '',
                            grant_type: 'refresh_token',
                            refresh_token: token.refresh_token || '',
                        }),
                        method: 'POST',
                    });

                    const tokens = await response.json();

                    if (!response.ok) throw tokens;

                    return {
                        ...token, // Keep the previous token properties
                        access_token: tokens.access_token,
                        expires_at: Math.floor(
                            Date.now() / 1000 + tokens.expires_in,
                        ),
                        id_token: tokens.id_token ?? token.id_token,
                        // Fall back to old refresh token, but note that
                        // many providers may only allow using a refresh token once.
                        refresh_token:
                            tokens.refresh_token ?? token.refresh_token,
                    };
                } catch (error) {
                    console.error('Error refreshing access token', error);
                    // The error property will be used client-side to handle the refresh token error
                    return {
                        ...token,
                        error: 'RefreshAccessTokenError' as const,
                    };
                }
            }
        },
        async session({ session, token }) {
            const newSession = {
                ...session,
                ...token,
            };
            return newSession;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
