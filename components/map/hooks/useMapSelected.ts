import { GeoJSONSource, Map } from 'maplibre-gl';
import { useEffect } from 'react';
import { LAYER_ID, LAYER_IMG, LAYER_SRC } from '../main/constant';
import {
    generatePulsingDot,
    generateRotatingHexagon,
} from '../main/canvasImage';
import LoadingState from '@/types/loading-state.enum';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { getValObject } from '@/utils';
import { GeoJsonGeometryEnum } from '@/types/geojson-geometry.enum';

function useMapSelected() {
    const { myMap, mapStatus } = useMapLibreContext();
    useEffect(() => {
        if (mapStatus !== LoadingState.SUCCESS) return;
        const selectedPointHexagonSource = LAYER_SRC.SELECTED_PT_HEXAGON;
        const selectedPointHexagonLayer = LAYER_ID.SELECTED_PT_HEXAGON;
        const selectedPointHexagonImage = LAYER_IMG.SELECTED_PT_HEXAGON;

        const selectedPointPulsingDotSource = LAYER_SRC.SELECTED_PT_PULSING_DOT;
        const selectedPointPulsingDotLayer = LAYER_ID.SELECTED_PT_PULSING_DOT;
        const selectedPointPulsingDotImage = LAYER_IMG.SELECTED_PT_PULSING_DOT;

        const selectedLineSource = LAYER_SRC.SELECTED_LN;
        const selectedLineLayer = LAYER_ID.SELECTED_LN;

        const selectedPolygonSource = LAYER_SRC.SELECTED_PL;
        const selectedPolygonLayer = LAYER_ID.SELECTED_PL;

        const listLayer = [
            selectedPointHexagonLayer,
            selectedPointPulsingDotLayer,
            selectedLineLayer,
            selectedPolygonLayer,
        ];
        const listSource = [
            selectedPointHexagonSource,
            selectedPointPulsingDotSource,
            selectedLineSource,
            selectedPolygonSource,
        ];
        const listImage = [
            selectedPointHexagonImage,
            selectedPointPulsingDotImage,
        ];

        const onMapLoad = (map: Map) => {
            listLayer.forEach((layer) => {
                if (map.getLayer(layer)) {
                    map.removeLayer(layer);
                }
            });
            listSource.forEach((src) => {
                if (map.getSource(src)) {
                    map.removeSource(src);
                }
            });
            listImage.forEach((imgId) => {
                if (map.getImage(imgId)) {
                    map.removeImage(imgId);
                }
            });

            const rotatingHexagon = generateRotatingHexagon(map);
            map.addImage(selectedPointHexagonImage, rotatingHexagon, {
                pixelRatio: 2,
            });
            const pulsingDot = generatePulsingDot(map);
            map.addImage(selectedPointPulsingDotImage, pulsingDot, {
                pixelRatio: 2,
            });

            // ===================== Add POLYGON ========================================

            map.addSource(selectedPolygonSource, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: selectedPolygonLayer,
                type: 'fill',
                source: selectedPolygonSource,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-color': '#FF6400',
                    'fill-opacity': 0.5,
                    'fill-outline-color': '#088',
                },
            });

            // ===================== Add LINE ========================================

            map.addSource(selectedLineSource, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });
            map.addLayer({
                id: selectedLineLayer,
                type: 'line',
                source: selectedLineSource,
                layout: {
                    visibility: 'none',
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#FF6400',
                    'line-width': 6,
                },
            });

            // ===================== Add POINT HEXAGON ========================================

            map.addSource(selectedPointHexagonSource, {
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
                id: selectedPointHexagonLayer,
                type: 'symbol',
                source: selectedPointHexagonSource,
                layout: {
                    'icon-image': selectedPointHexagonImage,
                    visibility: 'none',
                    'icon-allow-overlap': true,
                    'text-allow-overlap': true,
                    'icon-ignore-placement': true,
                    'text-ignore-placement': true,
                },
            });
            // ===================== Add POINT Pulsing Dot ========================================

            map.addSource(selectedPointPulsingDotSource, {
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
                id: selectedPointPulsingDotLayer,
                type: 'symbol',
                source: selectedPointPulsingDotSource,
                layout: {
                    'icon-image': selectedPointPulsingDotImage,
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

    const selectedPointSource = LAYER_SRC.SELECTED_PT_HEXAGON;
    const selectedPointLayer = LAYER_ID.SELECTED_PT_HEXAGON;
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
    const selectedPointLayer = LAYER_ID.SELECTED_PT_HEXAGON;
    if (myMap.getLayer(selectedPointLayer)) {
        myMap.setLayoutProperty(selectedPointLayer, 'visibility', 'none');
    }
};

export function getGeometryType(feature: ObjectLiteral): GeoJsonGeometryEnum {
    return getValObject(feature, 'geometry.type', '');
}

export function getSimplifyGeometryType(
    geoType: GeoJsonGeometryEnum,
): 'Point' | 'Line' | 'Polygon' | '' {
    switch (geoType) {
        case GeoJsonGeometryEnum.Point:
        case GeoJsonGeometryEnum.MultiPoint:
            return 'Point';

        case GeoJsonGeometryEnum.LineString:
        case GeoJsonGeometryEnum.MultiLineString:
            return 'Line';

        case GeoJsonGeometryEnum.Polygon:
        case GeoJsonGeometryEnum.MultiPolygon:
            return 'Polygon';

        default:
            return '';
    }
}

function polygonPulseEffect(map: Map, layerId: string, pulseTimeOut = 2000) {
    let pulseTime = 0;
    let animationId: number | null; // To store the requestAnimationFrame ID

    function animatePulse() {
        pulseTime += 0.1; // Increase over time

        // Calculate new opacity using sine wave
        const newOpacity = 0.4 + Math.sin(pulseTime) * 0.3; // Oscillate between 0.2 and 0.7

        // Update the fill-opacity property dynamically
        map.setPaintProperty(layerId, 'fill-opacity', newOpacity);

        // Request the next animation frame and store the ID
        animationId = requestAnimationFrame(animatePulse);
    }

    // Function to start the pulse animation
    function startPulse() {
        if (!animationId) {
            animatePulse(); // Start the animation
        }
    }

    // Function to stop the pulse animation
    function stopPulse() {
        if (animationId) {
            cancelAnimationFrame(animationId); // Stop the animation
            animationId = null; // Reset the ID
            map.setPaintProperty(layerId, 'fill-opacity', 0.5);
        }
    }

    // Start the pulse animation
    startPulse();

    // Example usage to stop the animation after 5 seconds
    setTimeout(() => {
        stopPulse();
    }, pulseTimeOut);
}

function linePulseEffect(map: Map, layerId: string, pulseTimeOut = 2000) {
    let pulseTime = 0;
    let lineAnimationId: number | null;

    function animateLinePulse() {
        pulseTime += 0.1; // Increment time

        // Calculate new opacity using sine wave (oscillates between 0.4 and 0.8)
        const newOpacity = 0.6 + Math.sin(pulseTime) * 0.2;

        // Update the line-opacity property dynamically
        map.setPaintProperty(layerId, 'line-opacity', newOpacity);

        // Request the next animation frame and store the ID
        lineAnimationId = requestAnimationFrame(animateLinePulse);
    }

    // Function to start the pulse animation
    function startLinePulse() {
        if (!lineAnimationId) {
            animateLinePulse(); // Start the animation
        }
    }

    // Function to stop the pulse animation
    function stopLinePulse() {
        if (lineAnimationId) {
            cancelAnimationFrame(lineAnimationId); // Stop the animation
            lineAnimationId = null; // Reset the ID
            map.setPaintProperty(layerId, 'line-opacity', 1);
        }
    }

    // Start the line pulse animation
    startLinePulse();

    // Example usage to stop the animation after 5 seconds
    setTimeout(() => {
        stopLinePulse();
    }, pulseTimeOut);
}

export const showSelectedGeometry = (
    myMap: Map | null,
    feature: ObjectLiteral,
    hideOtherSelectedLayer = true,
) => {
    if (!myMap) return;
    if (!feature) return;

    const geoType = getSimplifyGeometryType(getGeometryType(feature));
    let selectedSource = '';
    let selectedLayer = '';
    let listHideOtherSelectedLayer: string[] = [];

    if (geoType === 'Point') {
        selectedSource = LAYER_SRC.SELECTED_PT_PULSING_DOT;
        selectedLayer = LAYER_ID.SELECTED_PT_PULSING_DOT;
        listHideOtherSelectedLayer = [
            LAYER_ID.SELECTED_LN,
            LAYER_ID.SELECTED_PL,
        ];
    } else if (geoType === 'Line') {
        selectedSource = LAYER_SRC.SELECTED_LN;
        selectedLayer = LAYER_ID.SELECTED_LN;
        listHideOtherSelectedLayer = [
            LAYER_ID.SELECTED_PT_PULSING_DOT,
            LAYER_ID.SELECTED_PL,
        ];
        linePulseEffect(myMap, selectedLayer, 3500);
    } else if (geoType === 'Polygon') {
        selectedSource = LAYER_SRC.SELECTED_PL;
        selectedLayer = LAYER_ID.SELECTED_PL;
        listHideOtherSelectedLayer = [
            LAYER_ID.SELECTED_LN,
            LAYER_ID.SELECTED_PT_PULSING_DOT,
        ];
        polygonPulseEffect(myMap, selectedLayer, 3500);
    }

    if (selectedSource && selectedLayer) {
        const dataSource = myMap.getSource(selectedSource) as GeoJSONSource;
        if (dataSource) {
            dataSource.setData(feature.geometry);
        }
        if (myMap.getLayer(selectedLayer)) {
            myMap.setLayoutProperty(selectedLayer, 'visibility', 'visible');
        }
    }
    if (hideOtherSelectedLayer) {
        listHideOtherSelectedLayer.forEach((layerId) => {
            if (myMap.getLayer(layerId)) {
                myMap.setLayoutProperty(layerId, 'visibility', 'none');
            }
        });
    }
};

export const hideSelectedGeometry = (
    myMap: Map | null,
    feature: ObjectLiteral,
) => {
    if (!myMap) return;
    if (!myMap.loaded()) return;
    if (!feature) return;

    const geoType = getSimplifyGeometryType(getGeometryType(feature));
    let selectedLayer = '';

    if (geoType === 'Point') {
        selectedLayer = LAYER_ID.SELECTED_PT_PULSING_DOT;

        if (myMap.getLayer(selectedLayer)) {
            myMap.setLayoutProperty(selectedLayer, 'visibility', 'visible');
        }
    } else if (geoType === 'Line') {
        selectedLayer = LAYER_ID.SELECTED_LN;
    } else if (geoType === 'Polygon') {
        selectedLayer = LAYER_ID.SELECTED_PL;
    }

    if (selectedLayer) {
        if (myMap.getLayer(selectedLayer)) {
            myMap.setLayoutProperty(selectedLayer, 'visibility', 'none');
        }
    }
};

export const hideAllSelectedLayer = (myMap: Map | null) => {
    if (!myMap) return;
    if (!myMap.loaded()) return;
    const listHideOtherSelectedLayer = [
        LAYER_ID.SELECTED_PT_PULSING_DOT,
        LAYER_ID.SELECTED_LN,
        LAYER_ID.SELECTED_PL,
    ];
    listHideOtherSelectedLayer.forEach((layerId) => {
        if (myMap.getLayer(layerId)) {
            myMap.setLayoutProperty(layerId, 'visibility', 'none');
        }
    });
};
