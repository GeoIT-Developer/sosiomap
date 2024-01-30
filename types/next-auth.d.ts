import NextAuth from 'next-auth';

interface DataType {
    user: User;
    expires: string;
    name: string;
    email: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    access_token: string;
    id_token: string;
    refresh_token: string;
    expires_at: number;
    error?: 'RefreshAccessTokenError';
}

interface User {
    name: string;
    email: string;
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    type Session = DataType;
}
