import dayjs from 'dayjs';
import {
    LngLat,
    MapGeoJSONFeature,
    MapMouseEvent,
    Properties,
} from 'maplibre-gl';
import { ReadonlyURLSearchParams } from 'next/navigation';
import CryptoJS from 'crypto-js';
import imageCompression from 'browser-image-compression';
// @ts-ignore
import * as turf from '@turf/turf';

export const myTurf = turf;

export const keycloakJWTDecode = (token: string) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

export function capitalizeWords(str: string) {
    const lowStr = str.toLowerCase();
    return lowStr.replace(/\b\w/g, (match) => match.toUpperCase());
}

export function convertHorizontalToMapDegree(horizontalDegree: number) {
    const normalizedDegree = ((horizontalDegree % 360) + 360) % 360;
    const verticalAlignedDegree = normalizedDegree % 360;
    const mapDegree = (360 - verticalAlignedDegree) % 360;
    return mapDegree;
}

export function trimText(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength);
    }
    return text;
}

export function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

export function getUserAgent() {
    return navigator.userAgent;
}

export function getLngLat(coor: LngLat | undefined | null) {
    if (!coor) return { lng: 0, lat: 0 };
    const { lng, lat } = coor;
    return { lng: parseFloat(lng.toFixed(6)), lat: parseFloat(lat.toFixed(6)) };
}

export function updateSearchParams(
    searchParams: ReadonlyURLSearchParams,
    key: string,
    value?: string,
) {
    const currentParams = new URLSearchParams(
        Array.from(searchParams.entries()),
    );

    if (!value) {
        currentParams.delete(key);
    } else {
        currentParams.set(key, value);
    }
    const search = currentParams.toString();

    return search ? `?${search}` : '';
}

export function isValidURL(url: string) {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    return urlPattern.test(url);
}

export function fileToObjectURL(file: File) {
    const blob = new Blob([file], { type: file.type });
    const objURL = URL.createObjectURL(blob);
    return objURL;
}

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export function nameToInitial(name: string) {
    if (!name) return '-';
    const nameSplit = name.split(' ');
    if (nameSplit.length >= 2) {
        return `${nameSplit[0][0]}${nameSplit[1][0]}`;
    } else {
        return `${nameSplit[0][0]}`;
    }
}

export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function extractUsernameFromEmail(str: string) {
    if (isValidEmail(str)) {
        const username = str.split('@')[0];
        return username;
    } else {
        return str;
    }
}

export function formatDateTime(utcString: string, format: string = 'HH:mm') {
    const parsedDate = dayjs(utcString).format(format);
    return parsedDate;
}

export function formatDistance(distance: number) {
    return distance.toFixed(1);
}

export const getDateLabel = (eDate: string): 'today' | 'yesterday' | string => {
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const inputDate = dayjs(eDate).format('YYYY-MM-DD');

    if (inputDate === today) {
        return 'today';
    } else if (inputDate === yesterday) {
        return 'yesterday';
    } else {
        return dayjs(eDate).format('MMMM D, YYYY');
    }
};

export const getDateTimeString = (eDate: string | null | undefined): string => {
    if (!eDate) return '';
    const inputDate = dayjs(eDate).format('YYYY-MM-DD HH:mm:ss');
    return inputDate;
};

export function encrypt(inputData: any, stringify: boolean = false) {
    const theKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
    const theData = stringify ? JSON.stringify(inputData) : inputData;
    const encrypted = CryptoJS.AES.encrypt(theData, theKey);
    return encrypted.toString();
}

export function decrypt(encryptedData: string, parse: boolean = false) {
    const theKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '';
    const decrypted = CryptoJS.AES.decrypt(encryptedData, theKey);
    const strDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return parse ? JSON.parse(strDecrypted) : strDecrypted;
}

export function checkSecretCoordinate(
    secret: string,
    lat: number,
    lon: number,
) {
    if (!secret) return false;
    const { latitude, longitude }: GeolocationCoordinates = decrypt(
        secret,
        true,
    );
    if (Number(latitude) === Number(lat) && Number(longitude) === Number(lon)) {
        return true;
    }
    return false;
}

export async function compressImage(imageFile: File): Promise<File> {
    const options = {
        maxSizeMB: 0.65,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
        maxIteration: 20,
    };
    return await imageCompression(imageFile, options);
}

export function sensorLocation(coor: number, precision: number = 2) {
    return Number(coor.toFixed(precision));
}

export function calculateManhattanDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
) {
    const horizontal1 = turf.point([lon1, lat1]);
    const horizontal2 = turf.point([lon2, lat1]);
    const horizontalDistance = turf.distance(horizontal1, horizontal2, {
        units: 'kilometers',
    });

    const vertical1 = turf.point([lon1, lat1]);
    const vertical2 = turf.point([lon1, lat2]);
    const verticalDistance = turf.distance(vertical1, vertical2, {
        units: 'kilometers',
    });

    return Number((horizontalDistance + verticalDistance).toFixed(3));
}

export function addMinioPrefix(path: string) {
    return process.env.NEXT_PUBLIC_OBJECT_STORAGE_URL + path;
}

export function extensionToMimeType(extension: string): string | undefined {
    const mimeTypes: { [key: string]: string } = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
        tiff: 'image/tiff',
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        txt: 'text/plain',
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        json: 'application/json',
        xml: 'application/xml',
        zip: 'application/zip',
        tar: 'application/x-tar',
    };

    const lowercasedExtension = extension.toLowerCase();
    return mimeTypes[lowercasedExtension];
}

export function getFileExtensionFromUrl(url: string): string {
    const lastDotIndex = url.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        const extension = url.slice(lastDotIndex + 1).toLowerCase();
        return extension;
    }
    return '';
}

export function getMimeTypeFromURL(url: string) {
    const extension = getFileExtensionFromUrl(url);
    return extensionToMimeType(extension) || '';
}

export function getMapLibreCoordinate(
    e: MapMouseEvent & {
        features?: MapGeoJSONFeature[] | undefined;
    } & Object,
) {
    if (!e.features) return;
    // @ts-ignore
    const coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    var point = turf.point([-75.343, 39.984], 'ss');
    return {
        coordinates,
        properties: e.features[0].properties,
    };
}

export function getLastCharFromString(
    inputString: string,
    length: number,
): string {
    if (inputString.length >= length) {
        return inputString.substring(inputString.length - length);
    } else {
        return inputString;
    }
}
