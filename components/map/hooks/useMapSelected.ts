import { GeoJSONSource, Map } from 'maplibre-gl';
import { useEffect } from 'react';
import { LAYER_ID, LAYER_IMG, LAYER_SRC } from '../main/constant';
import { generateRotatingHexagon } from '../main/canvasImage';
import LoadingState from '@/types/loading-state.enum';
import { useMapLibreContext } from '@/contexts/MapLibreContext';

function useMapSelected() {
    const { myMap, mapStatus } = useMapLibreContext();
    useEffect(() => {
        if (mapStatus !== LoadingState.SUCCESS) return;
        const selectedPointSource = LAYER_SRC.SELECTED_PT;
        const selectedPointLayer = LAYER_ID.SELECTED_PT;
        const selectedPointImage = LAYER_IMG.SELECTED_PT;

        const onMapLoad = (map: Map) => {
            if (map.getLayer(selectedPointLayer)) {
                map.removeLayer(selectedPointLayer);
            }
            if (map.getSource(selectedPointSource)) {
                map.removeSource(selectedPointSource);
            }
            if (map.getImage(selectedPointImage)) {
                map.removeImage(selectedPointImage);
            }

            const rotatingHexagon = generateRotatingHexagon(map);
            map.addImage(selectedPointImage, rotatingHexagon, {
                pixelRatio: 2,
            });

            map.addSource(selectedPointSource, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [0, 0],
                            },
                        },
                    ],
                },
            });
            map.addLayer({
                id: selectedPointLayer,
                type: 'symbol',
                source: selectedPointSource,
                layout: {
                    'icon-image': selectedPointImage,
                    visibility: 'none',
                    'icon-allow-overlap': true,
                    'text-allow-overlap': true,
                    'icon-ignore-placement': true,
                    'text-ignore-placement': true,
                },
            });
        };

        if (myMap) {
            const checkIfLoaded = () => {
                if (myMap.isStyleLoaded()) {
                    onMapLoad(myMap);
                } else {
                    setTimeout(checkIfLoaded, 100);
                }
            };
            checkIfLoaded();
        }
    }, [myMap, mapStatus]);
}

export default useMapSelected;

export const showSelectedPoint = (
    myMap: Map | null,
    lon: number,
    lat: number,
) => {
    if (!myMap) return;

    const selectedPointSource = LAYER_SRC.SELECTED_PT;
    const selectedPointLayer = LAYER_ID.SELECTED_PT;
    const dataSource = myMap.getSource(selectedPointSource) as GeoJSONSource;
    if (dataSource) {
        dataSource.setData({
            type: 'Point',
            coordinates: [lon, lat],
        });
    }
    if (myMap.getLayer(selectedPointLayer)) {
        myMap.setLayoutProperty(selectedPointLayer, 'visibility', 'visible');
    }
};

export const hideSelectedPoint = (myMap: Map | null) => {
    if (!myMap) return;
    if (!myMap.loaded()) return;
    const selectedPointLayer = LAYER_ID.SELECTED_PT;
    if (myMap.getLayer(selectedPointLayer)) {
        myMap.setLayoutProperty(selectedPointLayer, 'visibility', 'none');
    }
};
