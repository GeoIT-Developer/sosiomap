'use client';

import { ReactChildrenProps } from '@/types/react-children.props';
import { SessionProvider } from 'next-auth/react';

export default function NextAuthProvider({ children }: ReactChildrenProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
