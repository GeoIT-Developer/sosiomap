import { useScopedI18n } from '@/locales/client';
import { useState, useEffect } from 'react';
import useLocalStorageFunc from './useLocalStorageFunc';
import { LOCAL_STORAGE } from '@/utils/constant';

interface MyLocation {
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
    timestamp: number;
}

export interface GeolocationHook {
    location: MyLocation | null;
    loading: boolean;
    error: string | null;
    permissionGranted: boolean | null;
    requestGeolocation: () => void;
    getLatestGeolocation: () => Promise<MyLocation>;
}

const useGeolocation = (): GeolocationHook => {
    const [location, setLocation] = useState<MyLocation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
        null,
    );
    const lastKnownLocation = useLocalStorageFunc<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const t = useScopedI18n('message.error');

    const requestGeolocation = () => {
        setError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {
                        accuracy,
                        altitude,
                        altitudeAccuracy,
                        heading,
                        latitude,
                        longitude,
                        speed,
                    } = position.coords;
                    const eLoc = {
                        accuracy,
                        altitude,
                        altitudeAccuracy,
                        heading,
                        latitude,
                        longitude,
                        speed,
                        timestamp: position.timestamp,
                    };
                    setLocation(eLoc);
                    lastKnownLocation.setItem(eLoc);
                    setLoading(false);
                    setPermissionGranted(true);
                },
                (error) => {
                    setLoading(false);
                    setPermissionGranted(false);
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setError(t('geolocation_denied'));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setError(t('geolocation_unavailable'));
                            break;
                        case error.TIMEOUT:
                            setError(t('geolocation_timeout'));
                            break;
                        default:
                            setError(t('geolocation_denied'));
                    }
                    setLocation(lastKnownLocation.getItem());
                },
            );
        } else {
            setError(t('geolocation_not_supported'));
            setLoading(false);
            setPermissionGranted(false);
        }
    };

    const getLatestGeolocation = async () => {
        return new Promise<MyLocation>((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {
                            accuracy,
                            altitude,
                            altitudeAccuracy,
                            heading,
                            latitude,
                            longitude,
                            speed,
                        } = position.coords;
                        const eLoc = {
                            accuracy,
                            altitude,
                            altitudeAccuracy,
                            heading,
                            latitude,
                            longitude,
                            speed,
                            timestamp: position.timestamp,
                        };
                        setLocation(eLoc);
                        lastKnownLocation.setItem(eLoc);
                        resolve(eLoc);
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                setError(t('geolocation_denied'));
                                reject(t('geolocation_denied'));
                                break;
                            case error.POSITION_UNAVAILABLE:
                                setError(t('geolocation_unavailable'));
                                reject(t('geolocation_unavailable'));
                                break;
                            case error.TIMEOUT:
                                setError(t('geolocation_timeout'));
                                reject(t('geolocation_timeout'));
                                break;
                            default:
                                setError(t('geolocation_denied'));
                                reject(t('geolocation_denied'));
                        }
                    },
                );
            } else {
                setError(t('geolocation_not_supported'));
                reject(t('geolocation_not_supported'));
            }
        });
    };

    useEffect(() => {
        requestGeolocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        location,
        loading,
        error,
        permissionGranted,
        requestGeolocation,
        getLatestGeolocation,
    };
};

export default useGeolocation;
