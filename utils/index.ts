import { ObjectLiteral } from '@/types/object-literal.interface';
import { toast } from 'react-toastify';

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

export function areObjectsEqual(
    obj1: ObjectLiteral,
    obj2: ObjectLiteral,
): boolean {
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Sort the keys to ensure order does not matter
    keys1.sort();
    keys2.sort();

    // Compare each key and value in both objects
    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (key !== keys2[i] || obj1[key] !== obj2[key]) {
            return false;
        }
    }

    // If all keys and values match, the objects are equal
    return true;
}

export function isObjectHasValues(obj: ObjectLiteral): boolean {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value !== null && value !== undefined && value !== '') {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    if (isObjectHasValues(value)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
    }
    return false;
}

export function cleanObject(obj: any): any {
    if (obj === null || obj === undefined || obj === '') {
        return undefined;
    }

    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }

    const cleanedObj: any = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const cleanedValue = cleanObject(obj[key]);
            if (cleanedValue !== undefined) {
                cleanedObj[key] = cleanedValue;
            }
        }
    }

    return Object.keys(cleanedObj).length === 0 ? undefined : cleanedObj;
}

export function sortByKey<T>(
    array: T[],
    key: keyof T,
    order: 'asc' | 'desc' = 'asc',
): T[] {
    return array.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA < valB) {
            return order === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
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
                    return 'Failed to access document : ' + resAsJSON?.message;
                } else {
                    return 'Error : ' + resAsJSON?.message;
                }
            } catch (err) {
                msg = getValObject(err, 'err.response.data.message');
            }
        } else {
            msg = err.response.status + ' ' + err.response.statusText;
            const eMessage =
                err.response.data?.message || err.response.data?.messages;
            if (eMessage) {
                if (Array.isArray(eMessage)) {
                    msg = eMessage.join(', ');
                } else if (typeof eMessage === 'object') {
                    msg = JSON.stringify(eMessage);
                } else {
                    msg = eMessage;
                }
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
                message:
                    'Failed to open the file : ' + errorResponse(resAsJSON),
            };
        } else {
            return {
                success: false,
                message: 'File not found : ' + errorResponse(resAsJSON),
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

export const showError = (err: any) => {
    toast.error(errorResponse(err), {
        theme: 'colored',
    });
};

export const validateEmail = (email: any) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};

export function getRandomNumber(
    min: number,
    max: number,
    decimalPlaces?: number,
): number {
    const randomNum = Math.random() * (max - min) + min;
    if (decimalPlaces === undefined) {
        return randomNum;
    }
    return parseFloat(randomNum.toFixed(decimalPlaces));
}

export async function shareUrl(
    url: string,
    title: string,
    desc?: string,
): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: desc,
                    url: url,
                });
                resolve();
            } catch (error) {
                resolve();
            }
        } else {
            reject(
                new Error('Web Share API is not supported in your browser.'),
            );
        }
    });
}
