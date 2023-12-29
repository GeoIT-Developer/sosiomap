import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID || '',
            clientSecret: process.env.NEXTAUTH_MY_SECRET || '',
            issuer: `${process.env.NEXTAUTH_URL_IAM}realms/${process.env.NEXTAUTH_REALM_IAM}`,
            authorization: { params: { scope: 'openid' } },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.access_token;
                token.id_token = account.id_token;
            }
            return { ...token };
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
