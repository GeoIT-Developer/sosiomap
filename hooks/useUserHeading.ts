import { useEffect } from 'react';
import LoadingState from '@/types/loading-state.enum';
import useDeviceOrientation from './useDeviceOrientation';
import { GeolocateControl, Map, Marker } from 'maplibre-gl';
import { convertHorizontalToMapDegree } from '@/utils/helper';

const useUserHeading = (
    myMap: Map | null,
    mapStatus: LoadingState,
    geoControl: GeolocateControl | undefined,
    userHeadingMarker: Marker | null,
) => {
    const deviceOrientation = useDeviceOrientation();

    useEffect(() => {
        function updateLocation(event: any) {
            const { latitude, longitude } = event.coords;
            userHeadingMarker?.setLngLat([longitude, latitude]);
        }

        if (myMap && mapStatus === LoadingState.SUCCESS) {
            geoControl?.on('geolocate', updateLocation);
        }
        return () => {
            if (geoControl) {
                geoControl.off('geolocate', updateLocation);
            }
        };
    }, [geoControl, mapStatus, myMap, userHeadingMarker]);

    useEffect(() => {
        const alpha = deviceOrientation.alpha || 0;
        if (alpha !== null) {
            const bearing = myMap?.getBearing() || 0;
            userHeadingMarker?.setRotation(
                convertHorizontalToMapDegree(alpha) - bearing,
            );
        }
    }, [deviceOrientation.alpha, myMap, userHeadingMarker]);
};

export default useUserHeading;
