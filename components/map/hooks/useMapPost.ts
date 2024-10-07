import { TopicType } from '@/hooks/useTopic';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { getMapLibreCoordinate, truncateText } from '@/utils/helper';
import MapLibreGL, { MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { useEffect } from 'react';
import { LAYER_ID, LAYER_SRC } from '../main/constant';
import LoadingState from '@/types/loading-state.enum';
import { useMapLibreContext } from '@/contexts/MapLibreContext';

function useMapPost(
    listMapPost: MapPostDataInterface[],
    activeTopicType: TopicType[],
    onSelectedPost: (
        e: MapMouseEvent & {
            features?: MapGeoJSONFeature[] | undefined;
        } & Object,
    ) => void,
) {
    const { myMap, mapStatus } = useMapLibreContext();
    useEffect(() => {
        if (mapStatus !== LoadingState.SUCCESS) return;
        const layerSrc = LAYER_SRC.POST_PT;
        const layerId = LAYER_ID.POST_PT;
        const layerIdLabel = LAYER_ID.POST_LABEL;

        const popup = new MapLibreGL.Popup({
            closeButton: false,
            closeOnClick: true,
            className: 'text-xl text-black font-bold !my-0',
        });

        const onClickLayer = (
            e: MapMouseEvent & {
                features?: MapGeoJSONFeature[] | undefined;
            } & Object,
        ) => {
            if (myMap) {
                onSelectedPost(e);
            }
        };
        const setCursorPointer = (
            e: MapMouseEvent & {
                features?: MapGeoJSONFeature[] | undefined;
            } & Object,
        ) => {
            if (myMap) {
                myMap.getCanvas().style.cursor = 'pointer';
                const eFeature = getMapLibreCoordinate(e);
                if (!eFeature) return;

                popup
                    .setLngLat(eFeature.coordinates)
                    .setHTML(
                        truncateText(eFeature.properties.title || '', 25) ||
                            truncateText(eFeature.properties.body || '', 25),
                    )
                    .addTo(myMap);
            }
        };
        const removeCursorPointer = () => {
            if (myMap) {
                myMap.getCanvas().style.cursor = '';
                popup.remove();
            }
        };
        const onMapLoad = () => {
            if (!myMap) return;
            if (myMap.getLayer(layerId)) {
                myMap.removeLayer(layerId);
            }
            if (myMap.getLayer(layerIdLabel)) {
                myMap.removeLayer(layerIdLabel);
            }
            if (myMap.getSource(layerSrc)) {
                myMap.removeSource(layerSrc);
            }
            myMap.addSource(layerSrc, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: listMapPost.map((item) => {
                        return {
                            type: 'Feature',
                            geometry: item.location,
                            properties: {
                                ...item,
                                color:
                                    activeTopicType.find(
                                        (it) => it.id === item.topic_id,
                                    )?.bgColor || 'red',
                                label:
                                    truncateText(item.title || '', 15) ||
                                    truncateText(item.body || '', 15),
                            },
                        };
                    }),
                },
            });
            myMap.addLayer({
                id: layerId,
                type: 'circle',
                source: layerSrc,
                paint: {
                    'circle-color': ['get', 'color'],
                    'circle-radius': 6,
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 2,
                },
            });
            myMap.addLayer({
                id: layerIdLabel,
                type: 'symbol',
                source: layerSrc,
                layout: {
                    'text-field': ['get', 'label'],
                    'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'auto',
                    'text-size': 14,
                },
                paint: {
                    'text-color': 'black',
                    'text-halo-color': 'white',
                    'text-halo-width': 2,
                },
            });

            myMap.on('mouseenter', layerId, setCursorPointer);
            myMap.on('mouseleave', layerId, removeCursorPointer);

            myMap.on('click', layerId, onClickLayer);
        };

        if (myMap) {
            const checkIfLoaded = () => {
                if (myMap.isStyleLoaded()) {
                    onMapLoad();
                } else {
                    setTimeout(checkIfLoaded, 100);
                }
            };
            checkIfLoaded();
        }
        return () => {
            if (myMap) {
                myMap.off('mouseenter', layerId, setCursorPointer);
                myMap.off('mouseleave', layerId, removeCursorPointer);
                myMap.off('click', layerId, onClickLayer);
            }
        };
    }, [activeTopicType, listMapPost, myMap, mapStatus]);
}

export default useMapPost;
