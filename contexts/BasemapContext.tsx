'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactChildrenProps } from '@/types/react-children.props';
import { LOCAL_STORAGE } from '@/utils/constant';
import { StyleSpecification } from 'maplibre-gl';
import React, { createContext, useContext, useEffect, useState } from 'react';

type BasemapType = {
    id: string;
    name: string;
    tiles: string[];
    attribution: string;
};

export const BASEMAP: {
    PRIMARY: BasemapType[];
    CARTO: BasemapType[];
    MAPBOX: BasemapType[];
} = {
    PRIMARY: [
        {
            id: 'osm',
            name: 'OSM',
            tiles: [
                'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
    ],
    CARTO: [
        {
            id: 'carto_voyager',
            name: 'Voyager',
            tiles: [
                'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
                'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            ],
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
        {
            id: 'carto_dark_matter',
            name: 'Dark Matter',
            tiles: [
                'http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                'http://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                'http://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                'http://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            ],
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
        {
            id: 'carto_positron',
            name: 'Positron',
            tiles: [
                'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            ],
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
    ],
    MAPBOX: [
        {
            id: 'mapbox_streets',
            name: 'Streets',
            tiles: [
                `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
            ],
            attribution:
                "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox</a> <a href='http://www.openstreetmap.org/about/' target='_blank'>© OpenStreetMap</a> <a class='mapbox-improve-map' href='https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=satellite-v9' target='_blank' rel='noopener nofollow'>Improve this map</a> <a href='https://www.maxar.com/' target='_blank'>© Maxar</a>",
        },
        {
            id: 'mapbox_satellite',
            name: 'Satellite',
            tiles: [
                `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
            ],
            attribution:
                "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox</a> <a href='http://www.openstreetmap.org/about/' target='_blank'>© OpenStreetMap</a> <a class='mapbox-improve-map' href='https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=satellite-v9' target='_blank' rel='noopener nofollow'>Improve this map</a> <a href='https://www.maxar.com/' target='_blank'>© Maxar</a>",
        },
        {
            id: 'mapbox_outdoors',
            name: 'Outdoors',
            tiles: [
                `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
            ],
            attribution:
                "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox</a> <a href='http://www.openstreetmap.org/about/' target='_blank'>© OpenStreetMap</a> <a class='mapbox-improve-map' href='https://apps.mapbox.com/feedback/?owner=mapbox&amp;id=satellite-v9' target='_blank' rel='noopener nofollow'>Improve this map</a> <a href='https://www.maxar.com/' target='_blank'>© Maxar</a>",
        },
    ],
};

const LIST_BASEMAP: BasemapType[] = Object.values(BASEMAP).flat();

const loadBasemap = (id: string) => {
    const basemap = LIST_BASEMAP.find((item) => item.id === id);

    return {
        version: 8,
        sources: {
            'raster-tiles': {
                type: 'raster',
                tiles: basemap?.tiles || [],
                tileSize: 256,
                attribution: basemap?.attribution || '',
                maxzoom: 19,
            },
        },
        layers: [
            {
                id: 'basemap-tiles',
                type: 'raster',
                source: 'raster-tiles',
            },
        ],
        glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    };
};

interface BasemapContextProps {
    basemap: string;
    setBasemap: (newBasemap: string) => void;
    style?: StyleSpecification;
}

const BasemapContext = createContext<BasemapContextProps>({
    basemap: 'osm',
    setBasemap: () => {},
});

export default function BasemapProvider({ children }: ReactChildrenProps) {
    const [basemap, setBasemap] = useLocalStorage<string>(
        LOCAL_STORAGE.BASEMAP,
        'osm',
    );
    const [style, setStyle] = useState<StyleSpecification | undefined>(
        undefined,
    );

    useEffect(() => {
        const eStyle = loadBasemap(basemap) as StyleSpecification;
        setStyle(eStyle);
    }, [basemap]);

    return (
        <BasemapContext.Provider value={{ basemap, setBasemap, style }}>
            {children}
        </BasemapContext.Provider>
    );
}

export const useBasemapContext = (): BasemapContextProps => {
    const context = useContext(BasemapContext);
    return context;
};
