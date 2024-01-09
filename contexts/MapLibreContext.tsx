import useMapLibre from '@/hooks/useMapLibre';
import useUserHeading from '@/hooks/useUserHeading';
import LoadingState from '@/types/loading-state.enum';
import { ReactChildrenProps } from '@/types/react-children.props';
import MapLibreGL, { GeolocateControl, Map, Marker } from 'maplibre-gl';
import { RefObject, createContext, useContext, useEffect, useRef } from 'react';

type MapLibreType = {
    mapContainer: RefObject<HTMLDivElement> | null;
    mapStatus: LoadingState;
    myMap: Map | null;
    geoControl: GeolocateControl | undefined;
};

const MapLibreContext = createContext<MapLibreType>({
    mapContainer: null,
    mapStatus: LoadingState.UNDEFINED,
    myMap: null,
    geoControl: undefined,
});

function UserHeadingComponent({ mapLibre }: { mapLibre: MapLibreType }) {
    const userHeadingMarker = useRef<Marker | null>(null);

    useEffect(() => {
        if (mapLibre.myMap && mapLibre.mapStatus === LoadingState.SUCCESS) {
            const compassMarker = document.createElement('div');
            compassMarker.id = 'compass-marker';
            userHeadingMarker.current = new MapLibreGL.Marker({
                element: compassMarker,
            });
            userHeadingMarker.current.setLngLat([0, 0]).addTo(mapLibre.myMap);
        }
    }, [mapLibre.mapStatus, mapLibre.myMap]);

    useUserHeading(
        mapLibre.myMap,
        mapLibre.mapStatus,
        mapLibre.geoControl,
        userHeadingMarker.current,
    );
    return null;
}

export const MapLibreProvider = ({ children }: ReactChildrenProps) => {
    const mapLibre = useMapLibre();
    return (
        <MapLibreContext.Provider value={mapLibre}>
            {children}
            <UserHeadingComponent mapLibre={mapLibre} />
        </MapLibreContext.Provider>
    );
};

export const useMapLibreContext = () => {
    const context = useContext(MapLibreContext);
    return context;
};
