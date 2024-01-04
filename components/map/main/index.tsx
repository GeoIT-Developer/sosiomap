import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import maplibregl, { Map, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// import classes from './MainMap.module.css';
// import {
//     getPolygonBoundingBox,
//     propertiesTableDiv,
//     wktToGeoJson,
// } from '@/utils/map';
import { INITIAL_MAP, LAYER_ID, LAYER_SRC, OSM_STYLE } from './constant';
import useWindowHeight from '@/hooks/useWindowHeight';
import useMapLibre from '@/hooks/useMapLibre';
import LoadingState from '@/types/loading-state.enum';
import { CircularProgress } from '@mui/material';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
// import { MainContext } from '@/container/HomePage';
// import * as turf from '@turf/turf';

export default function MainMap({
    children,
    isLoading,
    className = '',
}: {
    children?: ReactNode;
    isLoading?: boolean;
    className?: string;
}) {
    const { mapContainer, mapStatus } = useMapLibreContext();
    // const { selected, polygons, setGeojson } = useContext(MainContext);

    const { heightStyle } = useWindowHeight();

    useEffect(() => {
        // map.current.on('load', () => {
        //     if (!map.current) return;
        //     map.current.addSource(LAYER_SRC.ADMIN, {
        //         type: 'geojson',
        //         data: {
        //             type: 'FeatureCollection',
        //             features: [],
        //         },
        //     });
        //     map.current.addSource(LAYER_SRC.ADMIN_CENTROID, {
        //         type: 'geojson',
        //         data: {
        //             type: 'FeatureCollection',
        //             features: [],
        //         },
        //     });
        //     map.current.addLayer({
        //         id: LAYER_ID.ADMIN_PL,
        //         type: 'fill',
        //         source: LAYER_SRC.ADMIN,
        //         paint: {
        //             'fill-color': '#f7be6d',
        //             'fill-opacity': 0.2,
        //             'fill-outline-color': '#ff6600',
        //         },
        //     });
        //     map.current.addLayer({
        //         id: LAYER_ID.ADMIN_LN,
        //         type: 'line',
        //         source: LAYER_SRC.ADMIN,
        //         paint: {
        //             'line-color': '#ff6600',
        //             'line-width': 2,
        //         },
        //     });
        //     map.current.addLayer({
        //         id: LAYER_ID.ADMIN_SYMBOL,
        //         type: 'symbol',
        //         source: LAYER_SRC.ADMIN_CENTROID,
        //         layout: {
        //             'text-field': ['get', 'nama'],
        //             'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        //             'text-radial-offset': 0.5,
        //             'text-justify': 'auto',
        //             'text-size': 12,
        //         },
        //         paint: {
        //             'text-halo-color': 'white',
        //             'text-halo-width': 2,
        //         },
        //     });
        //     map.current.addLayer({
        //         id: LAYER_ID.ADMIN_PT,
        //         type: 'circle',
        //         source: LAYER_SRC.ADMIN_CENTROID,
        //         paint: {
        //             'circle-color': 'black',
        //             'circle-radius': 2,
        //             'circle-stroke-color': 'white',
        //             'circle-stroke-width': 2,
        //         },
        //     });
        //     map.current.on('click', LAYER_ID.ADMIN_PL, (e) => {
        //         if (!map.current) return;
        //         if (!e.features) return;
        //         new maplibregl.Popup()
        //             .setLngLat(e.lngLat)
        //             .setHTML(propertiesTableDiv(e.features[0].properties))
        //             .addTo(map.current);
        //     });
        //     // Change the cursor to a pointer when the mouse is over the states layer.
        //     map.current.on('mouseenter', LAYER_ID.ADMIN_PL, () => {
        //         if (!map.current) return;
        //         map.current.getCanvas().style.cursor = 'pointer';
        //     });
        //     // Change it back to a pointer when it leaves.
        //     map.current.on('mouseleave', LAYER_ID.ADMIN_PL, () => {
        //         if (!map.current) return;
        //         map.current.getCanvas().style.cursor = '';
        //     });
        // });
    }, []);

    // useEffect(() => {
    //     const headerElement = document.getElementById('public-layout-header');
    //     const footerElement = document.getElementById('public-layout-footer');

    //     if (headerElement?.clientHeight && footerElement?.clientHeight) {
    //         setMapHeight(
    //             `calc(100vh - ${headerElement.clientHeight}px - ${footerElement.clientHeight}px)`
    //         );
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!map.current) return;
    //     if (selected.geometry) {
    //         const bbox = getPolygonBoundingBox(selected.geometry.coordinates);
    //         map.current.fitBounds(bbox);
    //     }
    // }, [selected]);

    // useEffect(() => {
    //     if (!map.current) return;
    //     if (polygons.length > 0) {
    //         const adminSource = map.current.getSource(LAYER_SRC.ADMIN);
    //         const adminCentroidSource = map.current.getSource(
    //             LAYER_SRC.ADMIN_CENTROID
    //         );
    //         if (adminSource) {
    //             const geoPolygon = wktToGeoJson(
    //                 polygons,
    //                 selected.properties.NAMA
    //             );

    //             adminSource
    //                 // @ts-ignore
    //                 .setData(geoPolygon.geojson);

    //             if (adminCentroidSource) {
    //                 const listCentroid = geoPolygon.listFeature.map((item) => {
    //                     const center = turf.centerOfMass(item.geometry);
    //                     return {
    //                         ...center,
    //                         properties: item.properties,
    //                     };
    //                 });
    //                 const mDataPoint = {
    //                     type: 'FeatureCollection',
    //                     features: listCentroid,
    //                 };
    //                 adminCentroidSource
    //                     // @ts-ignore
    //                     .setData(mDataPoint);
    //             }
    //             setGeojson(geoPolygon.geojson);
    //         }
    //     }
    // }, [polygons]);

    return (
        <div
            className={`absolute top-0 left-0 w-full h-screen ${className}`}
            style={{ height: heightStyle }}
        >
            {mapStatus !== LoadingState.UNDEFINED && children}
            {(mapStatus === LoadingState.LOADING || isLoading) && (
                <CircularProgress
                    color='secondary'
                    className='absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2'
                />
            )}
            <div ref={mapContainer} className={`w-full h-full`} />
        </div>
    );
}
