import { useEffect, useState } from 'react';
import LoadingState from '@/types/loading-state.enum';
import { convertHorizontalToMapDegree } from '@/utils/helper';
import useDeviceOrientation from './useDeviceOrientation';
import { GeolocateControl, Map, Marker } from 'maplibre-gl';

const useUserHeading = (
    myMap: Map | null,
    mapStatus: LoadingState,
    geoControl: GeolocateControl,
    userHeadingMarker: Marker | null
) => {
    const deviceOrientation = useDeviceOrientation();
    const [active, setActive] = useState(12);

    useEffect(() => {
        const alpha = deviceOrientation.alpha || 90;

        function updateMarkerRotation(event: any) {
            const { latitude, longitude } = event.coords;
            if (latitude && longitude && alpha) {
                userHeadingMarker?.setRotation(
                    convertHorizontalToMapDegree(alpha)
                );
                userHeadingMarker?.setLngLat([longitude, latitude]);
            }
        }

        if (myMap && mapStatus === LoadingState.SUCCESS) {
            geoControl.on('geolocate', updateMarkerRotation);

            setInterval(() => {
                setActive(new Date().getTime());
            }, 1500);
        }
        return () => {
            if (geoControl) {
                geoControl.off('geolocate', updateMarkerRotation);
            }
        };
    }, [
        deviceOrientation.alpha,
        geoControl,
        mapStatus,
        myMap,
        userHeadingMarker,
    ]);
};

export default useUserHeading;
