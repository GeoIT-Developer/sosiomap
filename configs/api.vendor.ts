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

export type ParamsKPUType = {
    id: string;
    timestamp: number;
    type: 'DPD' | 'DPR' | 'DPRD_PROV' | 'DPRD_KAB_KOTA';
};

const API_VENDOR = {
    // searchOSM: (txt: string) => HOST.get(`/api/kpu/`, { params: { txt } }),
    searchOSM: (txt: string) => HOST.get(`/api/osm`, { params: { txt } }),
    getDataDPD: ({ id, timestamp }: { id: string; timestamp: string }) =>
        HOST.get(`/api/kpu`, { params: { id, timestamp, type: 'DPD' } }),
    getDataKPU: ({ id, timestamp, type }: ParamsKPUType) =>
        HOST.get(`/api/kpu`, { params: { id, timestamp, type } }),
};

export default API_VENDOR;
