import axios from 'axios';
import { HOST as HOST_BE } from './api';

const HOST = axios.create();

HOST.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

export type ParamsKPUType = {
    id: string;
    timestamp: number;
    type: 'DPD' | 'DPR' | 'DPRD_PROV' | 'DPRD_KAB_KOTA';
};

const API_VENDOR = {
    searchOSM: (txt: string) => HOST.get(`/api/osm`, { params: { txt } }),
    getDataKPU: ({ id, timestamp, type }: ParamsKPUType) =>
        HOST_BE.get(`vendor/kpu`, { params: { id, timestamp, type } }),
};

export default API_VENDOR;
