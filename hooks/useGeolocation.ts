import { useScopedI18n } from '@/locales/client';
import { useState, useEffect } from 'react';

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

interface GeolocationHook {
    location: MyLocation | null;
    loading: boolean;
    error: string | null;
    permissionGranted: boolean | null;
    requestGeolocation: () => void;
}

const useGeolocation = (): GeolocationHook => {
    const [location, setLocation] = useState<MyLocation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
        null
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
                    setLocation({
                        accuracy,
                        altitude,
                        altitudeAccuracy,
                        heading,
                        latitude,
                        longitude,
                        speed,
                        timestamp: position.timestamp,
                    });
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
                }
            );
        } else {
            setError(t('geolocation_not_supported'));
            setLoading(false);
            setPermissionGranted(false);
        }
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
    };
};

export default useGeolocation;
