import { getCookie } from 'cookies-next';
import axios from 'axios';
import { COOKIE, LOCAL_STORAGE } from '@/utils/constant';
import { encrypt } from '@/utils/helper';
import { GetPublicChatParamsInterface } from '@/types/api/params/get-public-chat.interface';
import { PostChatParamsInterface } from '@/types/api/params/post-chat.interface';
import { PostPostParamsInterface } from '@/types/api/params/post-post.interface';
import { GetPublicMapPostParamsInterface } from '@/types/api/params/get-public-map-post.interface';
import { PostCommentParamsInterface } from '@/types/api/params/post-comment.interface';

const HOST = axios.create();

HOST.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

const API_VENDOR = {
    searchOSM: (txt: string) => HOST.get(`/api/osm/${txt}`),
};

export default API_VENDOR;
