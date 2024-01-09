import { useRef, useEffect, useState } from 'react';
import MapLibreGL, { GeolocateControl, Map, MapOptions } from 'maplibre-gl';
import LoadingState from '@/types/loading-state.enum';
import { useBasemapContext } from '@/contexts/BasemapContext';
import { LOCAL_STORAGE } from '@/utils/constant';
import useLocalStorageFunc from './useLocalStorageFunc';

const INITIAL_MAP = {
    lat: -1.217506,
    lon: 116.827447,
    zoom: 4.5,
};

let geoControl: GeolocateControl | undefined = undefined;

const useMapLibre = (options?: MapOptions) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<Map | null>(null);
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

        geoControl = new MapLibreGL.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            // trackUserLocation: true,
            showUserLocation: true,
            showAccuracyCircle: true,
        });

        map.current.addControl(geoControl, 'top-right');

        map.current.on('load', () => {
            setMapStatus(LoadingState.SUCCESS);
            geoControl?.trigger();
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

        return () => {
            if (map.current) {
                map.current.off('moveend', handleMoveEnd);
                map.current.remove();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basemapStyle, options]);

    return { mapContainer, mapStatus, myMap: map.current, geoControl };
};

export default useMapLibre;
