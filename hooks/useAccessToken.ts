import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { keycloakJWTDecode } from '@/utils/helper';
import { AccessTokenType } from '@/types/access-token.interface';

const useAccessToken = () => {
    const session = useSession();

    const [token, setToken] = useState<AccessTokenType>();

    useEffect(() => {
        if (session.data?.access_token) {
            const decode = keycloakJWTDecode(session.data?.access_token);
            setToken(decode);
        }
    }, [session.data?.access_token]);

    return token;
};

export default useAccessToken;
