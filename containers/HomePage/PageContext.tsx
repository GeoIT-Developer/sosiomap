'use client';

import React, { createContext, useContext, useState } from 'react';
import { TopicType } from '@/hooks/useTopic';
import { LOCAL_STORAGE } from '@/utils/constant';
import useMapMarker from '@/components/map/hooks/useMapMarker';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import useLocalStorageFunc, {
    UseLocalStorageFuncResult,
} from '@/hooks/useLocalStorageFunc';
import { MyLocation } from '@/hooks/useGeolocation';
import { ObjectLiteral } from '@/types/object-literal.interface';
import useAPI, { UseAPIResult } from '@/hooks/useAPI';
import { GetPublicMapPostParamsInterface } from '@/types/api/params/get-public-map-post.interface';
import API from '@/configs/api';

type HomePageContextType = {
    selectedTopic: TopicType | null;
    setSelectedTopic: React.Dispatch<React.SetStateAction<TopicType | null>>;
    center: {
        lng: number;
        lat: number;
    };
    setShowMarker: React.Dispatch<React.SetStateAction<boolean>>;
    showMarker: boolean;
    showCardSlider: boolean | undefined;
    setShowCardSlider: React.Dispatch<
        React.SetStateAction<boolean | undefined>
    >;
    listScanData: MapPostDataInterface[];
    setListScanData: React.Dispatch<
        React.SetStateAction<MapPostDataInterface[]>
    >;
    openDial: boolean;
    setOpenDial: React.Dispatch<React.SetStateAction<boolean>>;
    locationStorage: UseLocalStorageFuncResult<MyLocation | null>;
    apiQueryPost: UseAPIResult<
        ObjectLiteral,
        GetPublicMapPostParamsInterface,
        MapPostDataInterface[],
        ObjectLiteral
    >;
    listMapPost: MapPostDataInterface[];
};

const HomePageContext = createContext<HomePageContextType | undefined>(
    undefined,
);

export const HomePageProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
    const { center, setShowMarker, showMarker } = useMapMarker();
    const [showCardSlider, setShowCardSlider] = useState<boolean>();
    const [listScanData, setListScanData] = useState<MapPostDataInterface[]>(
        [],
    );
    const [openDial, setOpenDial] = useState(false);
    const locationStorage = useLocalStorageFunc<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );

    const apiQueryPost = useAPI<
        ObjectLiteral,
        GetPublicMapPostParamsInterface,
        MapPostDataInterface[]
    >(API.getPublicMapPost, {
        listkey: 'data',
    });
    const listMapPost = apiQueryPost.list || [];

    const theValue: HomePageContextType = {
        selectedTopic,
        setSelectedTopic,
        center,
        setShowMarker,
        showMarker,
        showCardSlider,
        setShowCardSlider,
        listScanData,
        setListScanData,
        openDial,
        setOpenDial,
        locationStorage,
        apiQueryPost,
        listMapPost,
    };

    return (
        <HomePageContext.Provider value={theValue}>
            {children}
        </HomePageContext.Provider>
    );
};

export function useHomePageContext() {
    const context = useContext(HomePageContext);
    if (!context) {
        throw new Error(
            'useActiveTopicContext must be used within a ActiveTopicContext',
        );
    }
    return context;
}
