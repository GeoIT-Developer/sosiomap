import axios from 'axios';

const HOST = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const API_SERVER = {
    getUser: (username: string) => {
        return HOST.get(`users/${username}`, {
            params: { param: 'user-profile-summary' },
        });
    },
    getPost: (post_id: string) => {
        return HOST.get(`posts/${post_id}`);
    },
};

export default API_SERVER;
