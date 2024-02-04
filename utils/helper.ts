import dayjs from 'dayjs';
import { LngLat } from 'maplibre-gl';
import { ReadonlyURLSearchParams } from 'next/navigation';
import CryptoJS from 'crypto-js';

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

export const getDateLabel = (eDate: string) => {
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const inputDate = dayjs(eDate).format('YYYY-MM-DD');

    if (inputDate === today) {
        return 'Today';
    } else if (inputDate === yesterday) {
        return 'Yesterday';
    } else {
        return dayjs(eDate).format('MMMM D, YYYY');
    }
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
