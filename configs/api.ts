import { getCookie } from 'cookies-next';
import axios from 'axios';
import { COOKIE, LOCAL_STORAGE } from '@/utils/constant';
import { encrypt } from '@/utils/helper';
import { GetPublicChatParamsInterface } from '@/types/api/params/get-public-chat.interface';
import { PostChatParamsInterface } from '@/types/api/params/post-chat.interface';
import { PostPostParamsInterface } from '@/types/api/params/post-post.interface';
import { GetPublicMapPostParamsInterface } from '@/types/api/params/get-public-map-post.interface';
import { PostCommentParamsInterface } from '@/types/api/params/post-comment.interface';
import { PutProfileDataParamsInterface } from '@/types/api/params/put-profile-data.interface';
import { cleanObject } from '@/utils';

export const HOST = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

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

    getPublicPostById: (post_id: string) => HOST.get(`posts/${post_id}`),

    postReact: ({
        post_id,
        reaction,
    }: {
        post_id: string;
        reaction: string;
    }) => {
        return HOST.post(`posts/react`, {
            post_id,
            react: reaction || 'neutral',
        });
    },

    postShare: (post_id: string) => {
        return HOST.post(`posts/share/${post_id}`);
    },

    postBookmark: ({
        post_id,
        bookmark,
    }: {
        post_id: string;
        bookmark: boolean;
    }) => {
        return HOST.post(
            `posts/bookmark/${post_id}/${bookmark ? 'add' : 'remove'}`,
        );
    },

    postArchive: ({
        post_id,
        archive,
    }: {
        post_id: string;
        archive: boolean;
    }) => {
        return HOST.post(
            `posts/archive/${post_id}/${archive ? 'archive' : 'unarchive'}`,
        );
    },

    postDelete: (post_id: string) => {
        return HOST.delete(`posts/${post_id}`);
    },

    postComment: (params: PostCommentParamsInterface) => {
        const formData = new FormData();
        Object.keys(params).forEach((key) => {
            const eVal = params[key as keyof PostCommentParamsInterface];
            if (typeof eVal === 'number') {
                formData.append(key, String(eVal));
            } else {
                if (eVal) {
                    formData.append(key, eVal);
                }
            }
        });
        return HOST.post(`comments`, formData);
    },

    commentReact: ({
        comment_id,
        reaction,
    }: {
        comment_id: string;
        reaction: string;
    }) => {
        return HOST.post(`comments/react`, {
            post_id: comment_id,
            react: reaction || 'neutral',
        });
    },

    getPublicComment: (postId: string) => HOST.get(`comments/${postId}`),

    getRequestAccountDeletion: () =>
        HOST.get(`account/request-account-deletion`),

    postRequestAccountDeletion: () =>
        HOST.post(`account/request-account-deletion`),

    putRequestAccountDeletion: (requestId: string) =>
        HOST.put(`account/request-account-deletion`, {
            request_id: requestId,
        }),

    putProfilePhoto: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return HOST.put(`users/me/photo`, formData);
    },

    putProfileCoverPhoto: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return HOST.put(`users/me/cover`, formData);
    },

    getProfile: () => {
        return HOST.get(`users/me`, {
            params: { param: 'user-profile-summary' },
        });
    },

    putProfileData: (rawData: PutProfileDataParamsInterface) => {
        const newObj = cleanObject(rawData);
        return HOST.put(`users/me`, newObj);
    },

    getProfilePosts: () => HOST.get(`users/me/posts`),
    getProfileSavedPosts: () => HOST.get(`users/me/posts/saved`),
    getProfileArchivedPosts: () => HOST.get(`users/me/posts/archived`),

    getUser: (username: string) => {
        return HOST.get(`users/${username}`, {
            params: { param: 'user-profile-summary' },
        });
    },
    getUserPosts: (username: string) => HOST.get(`users/${username}/posts`),
};

export default API;
