import {
    Autocomplete,
    Button,
    CircularProgress,
    Fab,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import BasemapDrawer from '@/components/map/BasemapDrawer';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import MyImage from '@/components/preview/MyImage';
import {
    ASSETS,
    LOCAL_STORAGE,
    POPUP_PARAMS,
    QUERY,
    ROUTE,
} from '@/utils/constant';
import React, { useEffect, useState } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import { getLngLat, getMapLibreCoordinate, truncateText } from '@/utils/helper';
import { useI18n } from '@/locales/client';
import { useSearchParams } from 'next/navigation';
import { TopicType } from '@/hooks/useTopic';
import ChooseLocationEnum from '@/types/choose-location.enum';
import LayerDrawer from './LayerDrawer';
import RefreshIcon from '@mui/icons-material/Refresh';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { GetPublicMapPostParamsInterface } from '@/types/api/params/get-public-map-post.interface';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import { MyLocation } from '@/hooks/useGeolocation';
import useTermDebounce from '@/hooks/useTermDebounce';
import API_VENDOR from '@/configs/api.vendor';
import {
    FeatureInterface,
    SearchOSMInterface,
} from '@/types/api/responses/search-osm.interface';
import { getValObject } from '@/utils';
import MapLibreGL, { MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import PostDrawer from '../Post/View/PostDrawer';
import useLocalStorage from '@/hooks/useLocalStorage';
import KPULayer from './custom/kpu';
import { useActiveTopicContext } from '../AppPage';
import useQueryParams from '@/hooks/useQueryParams';
import HomeSpeedDial from './HomeSpeedDial';
import useVisibilityChange from '@/hooks/useVisibilityChange';
import useRefresh from '@/hooks/useRefresh';
import { useCommonDrawer } from '@/components/drawer/CommonDrawer';

export default function HomePage({ show = true }: { show?: boolean }) {
    const t = useI18n();
    const [showMarker, setShowMarker] = useState(false);
    const { myMap } = useMapLibreContext();
    const [center, setCenter] = useState({ lng: 0, lat: 0 });
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
    const { activeTopicType } = useActiveTopicContext();
    const locationStorage = useLocalStorageFunc<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const [locationStore] = useLocalStorage<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const [searchTxt, setSearchTxt] = useTermDebounce('', 850);
    const [inputSearch, setInputSearch] = useState('');
    const [refresh, setRefresh] = useRefresh();

    useVisibilityChange('always', () => setRefresh());
    const queryParams = useQueryParams();
    const searchParams = useSearchParams();

    const { list: listOptions, ...apiSearchOSM } = useAPI<
        SearchOSMInterface,
        string,
        FeatureInterface[]
    >(API_VENDOR.searchOSM, {
        listkey: 'data.features',
        onError: (err) => {
            toast.error(err, { theme: 'colored' });
        },
    });

    useEffect(() => {
        setSearchTxt(inputSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearch]);

    useEffect(() => {
        if (!searchTxt) return;
        apiSearchOSM.call(searchTxt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTxt]);

    useEffect(() => {
        if (!showMarker) return;
        const mapMarker = document.getElementById('map_marker');
        setCenter(getLngLat(myMap?.getCenter()));

        const handleMoveStart = () => {
            if (mapMarker) {
                mapMarker.style.marginTop = '-48px';
            }
        };
        const handleMoveEnd = () => {
            if (mapMarker) {
                mapMarker.style.marginTop = '-32px';
                setCenter(getLngLat(myMap?.getCenter()));
            }
        };
        myMap?.on('movestart', handleMoveStart);
        myMap?.on('moveend', handleMoveEnd);

        return () => {
            if (myMap) {
                myMap.off('movestart', handleMoveStart);
                myMap.off('moveend', handleMoveEnd);
            }
        };
    }, [myMap, showMarker]);

    function onClickOKMarker() {
        setShowMarker(false);
        const theURL = `${ROUTE.POST.NEW.URL}?${QUERY.LOCATION}=${ChooseLocationEnum.CHOOSE_ON_MAP}&${QUERY.LON}=${center.lng}&${QUERY.LAT}=${center.lat}&${QUERY.TOPIC}=${selectedTopic?.id}`;
        window.open(theURL, '_blank');
    }

    const { list: listMapPost, ...apiQueryPost } = useAPI<
        ObjectLiteral,
        GetPublicMapPostParamsInterface,
        MapPostDataInterface[]
    >(API.getPublicMapPost, {
        listkey: 'data',
    });

    function refreshMapPost() {
        apiQueryPost.call({
            topic_ids: activeTopicType.map((item) => item.id).join('|'),
            lat: locationStorage.getItem()?.latitude || 0,
            lon: locationStorage.getItem()?.longitude || 0,
        });
    }

    useEffect(() => {
        if (!show) return;
        if (!activeTopicType.length) {
            apiQueryPost.clearData();
            return;
        }
        refreshMapPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopicType, show, refresh]);

    const [selectedPost, setSelectedPost] = useState<MapPostDataInterface>(
        {} as MapPostDataInterface,
    );

    const { openDrawer, setOpenDrawer } = useCommonDrawer();

    const toggleDrawer =
        (open: boolean, post?: MapPostDataInterface) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setOpenDrawer(open);
            if (open) {
                if (post?._id) {
                    queryParams.addParam(
                        POPUP_PARAMS.POST_DETAIL.KEY,
                        post._id,
                    );
                }
            } else {
                queryParams.removeParam(POPUP_PARAMS.POST_DETAIL.KEY);
            }
        };

    useEffect(() => {
        if (!openDrawer) return;
        const postId = selectedPost._id;
        const postIdParams = searchParams.get(POPUP_PARAMS.POST_DETAIL.KEY);
        if (postIdParams !== postId) {
            setOpenDrawer(false);
        }
    }, [searchParams]);

    useEffect(() => {
        const layerSrc = 'map-post-src';
        const layerId = 'map-post-layer';

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
                const eFeature = getMapLibreCoordinate(e);
                if (!eFeature) return;
                const postId = eFeature.properties._id;
                const findPost = listMapPost?.find(
                    (item) => item._id === postId,
                );
                if (findPost) {
                    setSelectedPost(findPost);
                    toggleDrawer(true, findPost)(e as any);
                }
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
            if (myMap.getLayer(layerId + '-label')) {
                myMap.removeLayer(layerId + '-label');
            }
            if (myMap.getSource(layerSrc)) {
                myMap.removeSource(layerSrc);
            }
            myMap.addSource(layerSrc, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: (listMapPost || []).map((item) => {
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
                id: layerId + '-label',
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
            myMap.on('load', onMapLoad);
            if (myMap.loaded()) {
                onMapLoad();
            }
        }
        return () => {
            if (myMap) {
                myMap.off('mouseenter', layerId, setCursorPointer);
                myMap.off('mouseleave', layerId, removeCursorPointer);
                myMap.off('click', layerId, onClickLayer);
                myMap.off('load', onMapLoad);
            }
        };
    }, [activeTopicType, listMapPost, myMap]);

    return (
        <>
            {showMarker && (
                <>
                    <div className='absolute top-1/2 left-1/2 z-10 w-1 h-1 bg-red-700 rounded-sm m-[-0.1rem]'></div>
                    <MyImage
                        id='map_marker'
                        src={ASSETS.MARKER + 'blue_marker.svg'}
                        alt='Marker'
                        width={24}
                        className='absolute top-1/2 left-1/2 z-10 mt-[-32px] ml-[-11px]'
                    />
                    <div
                        className='absolute top-[calc(50%-8rem)] left-1/2 z-10 bg-white text-center p-2 rounded-md opacity-75 backdrop-blur-lg'
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        <Typography variant='body2' className='text-black py-2'>
                            {JSON.stringify(center, undefined, 2)}
                        </Typography>
                        <div className='flex space-x-4'>
                            <Button
                                className='w-full'
                                size='small'
                                variant='outlined'
                                onClick={() => setShowMarker(false)}
                            >
                                {t('button.cancel')}
                            </Button>
                            <Button
                                className='w-full'
                                size='small'
                                variant='contained'
                                onClick={onClickOKMarker}
                            >
                                {t('button.ok')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
            <Stack
                spacing={1}
                direction='row'
                className='absolute z-10 top-4 left-[1rem] w-[calc(100%-2rem)]'
            >
                <Paper className='!rounded-full flex-grow'>
                    <Autocomplete
                        options={(listOptions || []).map((item) => item)}
                        getOptionLabel={(option) =>
                            getValObject(
                                option,
                                'properties.display_name',
                                option,
                            )
                        }
                        renderOption={(props, option) => {
                            // @ts-ignore
                            const { key, ...otherProps } = props;
                            return (
                                <ListItem
                                    key={option.properties.osm_id}
                                    {...otherProps}
                                >
                                    <ListItemText
                                        primary={option.properties.name}
                                        secondary={
                                            option.properties.display_name
                                        }
                                    />
                                </ListItem>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    className: '!rounded-full w-auto',
                                    startAdornment: <SearchIcon className='' />,
                                }}
                                placeholder='Search'
                                onChange={(e) => setInputSearch(e.target.value)}
                                value={inputSearch}
                            />
                        )}
                        size='small'
                        onChange={(_e, opt) => {
                            const bbox = opt?.bbox;
                            if (!bbox) return;
                            myMap?.fitBounds(bbox, {
                                essential: true,
                            });
                        }}
                        loading={apiSearchOSM.loading}
                    />
                </Paper>
                <Fab
                    aria-label='notification'
                    size='small'
                    className='flex-shrink'
                    onClick={refreshMapPost}
                >
                    {apiQueryPost.loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <RefreshIcon />
                    )}
                </Fab>
            </Stack>

            <Stack spacing={1} className='absolute z-10 top-20 left-4'>
                <BasemapDrawer />
                <LayerDrawer />
            </Stack>

            <HomeSpeedDial
                posts={listMapPost || []}
                setShowMarker={setShowMarker}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                showMarker={showMarker}
                userLocation={locationStore}
                activeParent={show}
            />

            <PostDrawer
                userLocation={locationStore}
                toggleDrawer={toggleDrawer}
                openDrawer={openDrawer}
                post={selectedPost}
            />

            <KPULayer />
        </>
    );
}
