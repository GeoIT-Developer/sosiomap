import { ObjectLiteral } from '@/types/object-literal.interface';

export function safeArray<T = ObjectLiteral>(arr: any, defaultValue = []) {
    if (Array.isArray(arr) && arr.length > 0) {
        return arr as T[];
    }
    return defaultValue as T[];
}

export function safeObject<T = ObjectLiteral>(obj: any, defaultValue = {}) {
    if (!!obj && typeof obj === 'object') {
        return obj as T;
    }
    return defaultValue as T;
}

export function safeString(str: any, defaultValue = '') {
    if (!!str && typeof str === 'string') {
        return str;
    } else if (typeof str === 'number') {
        return String(str);
    }
    return defaultValue;
}

export function safeNumber(num: any, defaultValue = 0) {
    if (typeof num === 'number') {
        return num;
    }
    return defaultValue;
}

export function getValObject(obj: any, key: string, defaultValue: any = '') {
    if (!!obj && typeof obj === 'object') {
        const splitKey = key.split('.');
        let value: any = obj;
        for (let i = 0; i < splitKey.length; i++) {
            value = safeObject(value)[splitKey[i]];
        }
        return value || defaultValue;
    }
    return defaultValue;
}

export function getLastElement<T>(arr: T[]) {
    if (arr.length > 0) {
        return arr[arr.length - 1];
    } else {
        return undefined;
    }
}

export function downloadFile(
    eData: any,
    type: string,
    fileName: string,
    fileType: string,
    createBlob = true,
) {
    if (!eData) return;
    const mBlob = createBlob ? new Blob([eData], { type: type }) : null;
    const fileObjURL = mBlob ? URL.createObjectURL(mBlob) : `${type}${eData}`;
    if (typeof document !== 'undefined') {
        const el = document.createElement('a');
        el.setAttribute('href', fileObjURL);
        el.setAttribute('download', fileName + '.' + fileType);
        document.body.appendChild(el);
        el.click();
        el.remove();
    }
}

export const errorResponse = (err: any, arrayBuffer = false): string => {
    let msg = '';

    if (err.response) {
        if (arrayBuffer) {
            try {
                const resAsString = new TextDecoder().decode(err.response.data);
                const resAsJSON = JSON.parse(resAsString);
                if (resAsJSON?.error) {
                    return 'Dokumen Gagal di panggil : ' + resAsJSON?.message;
                } else {
                    return 'Error : ' + resAsJSON?.message;
                }
            } catch (err) {
                msg = getValObject(err, 'err.response.data.message');
            }
        } else {
            msg = err.response.status + ' ' + err.response.statusText;
            if (err.response.data?.message) {
                msg = err.response.data?.message;
            } else if (err.response.data?.messages) {
                msg = err.response.data?.messages;
            }
        }
    } else if (err.message) {
        msg = err.message;
    } else {
        msg = safeString(err);
    }
    return msg;
};
export const getFileOrError = (datas: any, type = 'application/pdf') => {
    try {
        const resAsString = new TextDecoder().decode(datas);
        const resAsJSON = JSON.parse(resAsString);
        if (resAsJSON?.error) {
            return {
                success: false,
                message: 'File Gagal di panggil : ' + errorResponse(resAsJSON),
            };
        } else {
            return {
                success: false,
                message: 'File Tidak tersedia : ' + errorResponse(resAsJSON),
            };
        }
    } catch (err) {
        if (datas) {
            const file = new Blob([datas], {
                type,
            });
            const eFileURL = URL.createObjectURL(file);
            return {
                success: true,
                fileURL: eFileURL,
            };
        } else {
            return {
                success: false,
                message: err as string,
            };
        }
    }
};

export const validateEmail = (email: any) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};
