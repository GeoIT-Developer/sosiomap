export interface SearchOSMInterface {
    data: Data;
}

interface Data {
    type: string;
    licence: string;
    features: FeatureInterface[];
}

export interface FeatureInterface {
    type: string;
    properties: Properties;
    bbox: [number, number, number, number];
    geometry: Geometry;
}

interface Properties {
    place_id: number;
    osm_type: string;
    osm_id: number;
    place_rank: number;
    category: string;
    type: string;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
}

interface Geometry {
    type: string;
    coordinates: [number, number];
}
