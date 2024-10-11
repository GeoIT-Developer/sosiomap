export const OSM_STYLE = {
    version: 8,
    sources: {
        carto_dark_cdn: {
            type: 'raster',
            tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; Carto Dark CDN',
            maxzoom: 19,
        },
    },
    layers: [
        {
            id: 'carto_dark_cdn_id',
            type: 'raster',
            source: 'carto_dark_cdn',
        },
    ],
    // sources: {
    //     osm: {
    //         type: 'raster',
    //         tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
    //         tileSize: 256,
    //         attribution: '&copy; OpenStreetMap Contributors',
    //         maxzoom: 19,
    //     },
    // },
    // layers: [
    //     {
    //         id: 'osm',
    //         type: 'raster',
    //         source: 'osm',
    //     },
    // ],
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
};

export const INITIAL_MAP = {
    lat: -1.217506,
    lon: 116.827447,
    zoom: 4.5,
};

export const LAYER_SRC = {
    SELECTED_PT_PULSING_DOT: 'src-selected-pt',
    SELECTED_PT_HEXAGON: 'src-selected-pt-hexagon',
    SELECTED_LN: 'src-selected-ln',
    SELECTED_PL: 'src-selected-pl',

    POST_PT: 'src-post-pt',
    POST_LN: 'src-post-ln',
    POST_PL: 'src-post-pl',
};

export const LAYER_ID = {
    SELECTED_PT_PULSING_DOT: 'layer-selected-pt',
    SELECTED_PT_HEXAGON: 'layer-selected-pt-hexagon',
    SELECTED_LN: 'layer-selected-ln',
    SELECTED_PL: 'layer-selected-pl',

    POST_PT: 'layer-post-pt',
    POST_LABEL: 'layer-post-label',
    POST_LN: 'layer-post-ln',
    POST_PL: 'layer-post-pl',
};

export const LAYER_IMG = {
    SELECTED_PT_HEXAGON: 'img-selected-pt-hexagon',
    SELECTED_PT_PULSING_DOT: 'img-selected-pt-pulsing-dot',
};
