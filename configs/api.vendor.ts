import axios from 'axios';

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
