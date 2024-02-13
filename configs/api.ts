import { getCookie } from 'cookies-next';
import axios from 'axios';
import { COOKIE, LOCAL_STORAGE } from '@/utils/constant';
import { encrypt } from '@/utils/helper';
import { GetPublicChatParamsInterface } from '@/types/api/params/get-public-chat.interface';
import { PostChatParamsInterface } from '@/types/api/params/post-chat.interface';
import { PostPostParamsInterface } from '@/types/api/params/post-post.interface';
import { GetPublicMapPostParamsInterface } from '@/types/api/params/get-public-map-post.interface';

const HOST = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/// request interceptors
HOST.interceptors.request.use(
    (config) => {
        const tokenCookie = getCookie(COOKIE.TOKEN);
        if (tokenCookie) {
            config.headers['Authorization'] = 'Bearer ' + tokenCookie;
        }
        const lastKnownLocation = localStorage.getItem(
            LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        );
        if (lastKnownLocation) {
            config.headers['Secret'] = encrypt(
                JSON.parse(lastKnownLocation),
                true,
            );
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

const API = {
    getPublicChat: ({
        lat,
        lon,
        channel,
        distance = 10,
    }: GetPublicChatParamsInterface) =>
        HOST.get(`chats`, {
            params: {
                lon,
                lat,
                channel,
                distance,
            },
        }),

    postChat: ({ lat, lon, channel, body }: PostChatParamsInterface) =>
        HOST.post(`chats`, {
            body,
            channel,
            lat,
            lon,
        }),

    postPost: (params: PostPostParamsInterface) => {
        const formData = new FormData();
        Object.keys(params).forEach((key) => {
            const eVal = params[key as keyof PostPostParamsInterface];
            if (typeof eVal === 'number') {
                formData.append(key, String(eVal));
            } else {
                if (eVal) {
                    formData.append(key, eVal);
                }
            }
        });
        return HOST.post(`posts`, formData);
    },

    getPublicMapPost: ({
        lat,
        lon,
        topic_ids,
    }: GetPublicMapPostParamsInterface) =>
        HOST.get(`posts`, {
            params: {
                lon,
                lat,
                topic_ids,
            },
        }),
};

export default API;
