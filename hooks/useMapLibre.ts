import { useRef, useEffect, useState } from 'react';
import MapLibreGL, {
    Map,
    MapOptions,
    Marker,
    MarkerOptions,
} from 'maplibre-gl';
import LoadingState from '@/types/loading-state.enum';
import { useBasemapContext } from '@/contexts/BasemapContext';
import useLocalStorage from './useLocalStorage';
import { LOCAL_STORAGE } from '@/utils/constant';
import useLocalStorageFunc from './useLocalStorageFunc';
import { convertHorizontalToMapDegree } from '@/utils/helper';
import useUserHeading from './useUserHeading';

const INITIAL_MAP = {
    lat: -1.217506,
    lon: 116.827447,
    zoom: 4.5,
};

const geoControl = new MapLibreGL.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserLocation: true,
    showAccuracyCircle: true,
    // showUserHeading: true,
});

// const compassMarker = document.createElement('div');
// compassMarker.id = 'compass-marker';
// let userHeadingMarker = new MapLibreGL.Marker();

const useMapLibre = (options?: MapOptions) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<Map | null>(null);
    // const userHeadingMarker = useRef<Marker | null>(null);
    const { style: basemapStyle } = useBasemapContext();
    const mapInitialStorage = useLocalStorageFunc(
        LOCAL_STORAGE.MAP_INITIAL,
        INITIAL_MAP,
    );
    const [mapStatus, setMapStatus] = useState<LoadingState>(
        LoadingState.UNDEFINED,
    );

    useEffect(() => {
        if (!mapContainer.current) return;
        // let myMap = map.current;
        // if (map.current) return; // stops map from intializing more than once
        if (!basemapStyle) return;
        setMapStatus(LoadingState.LOADING);

        const {
            container: _container,
            style: _style,
            ...otherOptions
        } = options ?? {};

        const mapInitial = mapInitialStorage.getItem();

        map.current = new MapLibreGL.Map({
            container: mapContainer.current,
            style: basemapStyle,
            center: [mapInitial.lon, mapInitial.lat],
            zoom: mapInitial.zoom,
            logoPosition: 'bottom-left',
            attributionControl: false,
            ...otherOptions,
        });
        map.current.addControl(
            new MapLibreGL.AttributionControl(),
            'bottom-left',
        );
        map.current.addControl(
            new MapLibreGL.NavigationControl({
                showCompass: true,
                showZoom: true,
            }),
            'top-right',
        );

        map.current.addControl(geoControl, 'top-right');

        // const compassMarker = document.createElement('div');
        // compassMarker.id = 'compass-marker';
        // userHeadingMarker.current = new MapLibreGL.Marker({
        //     element: compassMarker,
        // });
        // userHeadingMarker.current.setLngLat([0, 0]).addTo(map.current);

        map.current.on('load', () => {
            setMapStatus(LoadingState.SUCCESS);

            // map.current?.on('geolocate', (event) => {
            //     const { coords } = event;

            //     const userCoordinates = {
            //         latitude: coords.latitude,
            //         longitude: coords.longitude,
            //     };

            //     console.log('User Coordinates:', userCoordinates);
            // });
        });

        let locationStatusUpdateTimeout: NodeJS.Timeout;
        const handleMoveEnd = () => {
            clearTimeout(locationStatusUpdateTimeout);

            locationStatusUpdateTimeout = setTimeout(() => {
                const { lng, lat } = map.current?.getCenter() ?? {};
                const zoom = map.current?.getZoom();
                if (lat && lng && zoom) {
                    mapInitialStorage.setItem({ lat, lon: lng, zoom });
                }
            }, 850);
        };

        map.current.on('moveend', handleMoveEnd);

        console.log('ZZZZ', map.current);

        return () => {
            if (map.current) {
                map.current.off('moveend', handleMoveEnd);
                map.current.remove();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basemapStyle, options]);

    // useEffect(() => {
    //     const alpha = geoLocation.orientation.alpha || 90;

    // function updateMarkerRotation(event: any) {
    //     const { latitude, longitude } = event.coords;
    //     if (latitude && longitude && alpha) {
    //         userHeadingMarker?.setRotation(convertHorizontalToMapDegree(alpha));
    //         userHeadingMarker?.setLngLat([longitude, latitude]);
    //     }
    // }

    // if (map.current && mapStatus === LoadingState.SUCCESS) {
    //     geoControl.on('geolocate', updateMarkerRotation);
    // }
    //     return () => {
    //         if (geoControl) {
    //             geoControl.off('geolocate', updateMarkerRotation);
    //         }
    //     };
    // }, [geoLocation.orientation.alpha, mapStatus]);

    // useUserHeading(
    //     map.current,
    //     mapStatus,
    //     geoControl,
    //     userHeadingMarker.current
    // );

    console.log('TTTEER');

    return { mapContainer, mapStatus, myMap: map.current, geoControl };
};

export default useMapLibre;
