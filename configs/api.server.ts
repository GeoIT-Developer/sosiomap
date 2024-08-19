import axios from 'axios';

export const HOST = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API_SERVER = {
    getUser: (username: string) => {
        return HOST.get(`users/${username}`, {
            params: { param: 'user-profile-summary' },
        });
    },
};

export default API_SERVER;
