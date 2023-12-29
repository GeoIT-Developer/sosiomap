import { getValObject } from '@/utils';
import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const keycloakJWTDecode = (token: string) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.CLIENT_ID || '',
            clientSecret: process.env.MY_SECRET || '',
            issuer: `${process.env.URL_IAM}realms/${process.env.REALM_IAM}`,
            authorization: { params: { scope: 'openid' } },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, ...rest }) {
            // token.nip = getValObject(profile, "preferred_username", "");
            if (account?.access_token) {
                token.access_token = account.access_token;
                try {
                    const decoded = keycloakJWTDecode(account.access_token);
                    token.roles = getValObject(
                        decoded,
                        'realm_access.roles',
                        [],
                    );
                    token.access_token_expired = decoded?.exp;
                    token.id_token = account.id_token;
                } catch (err) {
                    console.log('DECODE_JWT', err);
                }
            }
            if (account) {
                token.rest = {
                    user: user,
                    profile: profile,
                    account: account,
                    rest: rest,
                };
                // token.user = user;
                // token.profile = profile;
                // token.account = account;
                // token.rest = rest;
            }
            return token;
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
