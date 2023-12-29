import { useEffect } from 'react';
import LoadingState from '@/types/loading-state.enum';
import { convertHorizontalToMapDegree } from '@/utils/helper';
import useDeviceOrientation from './useDeviceOrientation';
import { GeolocateControl, Map, Marker } from 'maplibre-gl';

const useUserHeading = (
    myMap: Map | null,
    mapStatus: LoadingState,
    geoControl: GeolocateControl,
    userHeadingMarker: Marker | null,
) => {
    const deviceOrientation = useDeviceOrientation();

    useEffect(() => {
        function updateLocation(event: any) {
            const { latitude, longitude } = event.coords;
            userHeadingMarker?.setLngLat([longitude, latitude]);
        }

        if (myMap && mapStatus === LoadingState.SUCCESS) {
            geoControl.on('geolocate', updateLocation);
        }
        return () => {
            if (geoControl) {
                geoControl.off('geolocate', updateLocation);
            }
        };
    }, [geoControl, mapStatus, myMap, userHeadingMarker]);

    useEffect(() => {
        const alpha = deviceOrientation.alpha || 90;
        if (alpha) {
            userHeadingMarker?.setRotation(convertHorizontalToMapDegree(alpha));
        }
    }, [deviceOrientation.alpha, userHeadingMarker]);
};

export default useUserHeading;
