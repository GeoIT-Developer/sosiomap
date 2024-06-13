import { COOKIE, KEYCLOAK_BASE } from '@/utils/constant';
import { deleteCookie } from 'cookies-next';
import { signOut, useSession } from 'next-auth/react';

const useLogout = () => {
    const session = useSession();

    async function signout() {
        await signOut({ redirect: false });
        deleteCookie(COOKIE.TOKEN);
        window.location.href = `${KEYCLOAK_BASE}/protocol/openid-connect/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_REDIRECT_URI}&Id_token_hint=${session.data?.id_token}`;
    }

    return { signout };
};
export default useLogout;
