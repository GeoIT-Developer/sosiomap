import { LngLat } from 'maplibre-gl';
import { ReadonlyURLSearchParams } from 'next/navigation';

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
