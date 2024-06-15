import { getCookie } from 'cookies-next';
import axios from 'axios';
import { COOKIE, KEYCLOAK_BASE } from '@/utils/constant';

const HOST_KEYCLOAK = axios.create({
    baseURL: KEYCLOAK_BASE,
});

HOST_KEYCLOAK.interceptors.request.use(
    (config) => {
        const tokenCookie = getCookie(COOKIE.TOKEN);
        if (tokenCookie) {
            config.headers['Authorization'] = 'Bearer ' + tokenCookie;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

const API_KEYCLOAK = {
    getKeycloakUserInfo: () =>
        HOST_KEYCLOAK.get(`/protocol/openid-connect/userinfo`),
};

export default API_KEYCLOAK;
