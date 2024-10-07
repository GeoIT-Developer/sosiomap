import { CircularProgress, Fab, Stack } from '@mui/material';
import BasemapDrawer from '@/components/map/BasemapDrawer';
import { QUERY } from '@/utils/constant';
import React, { useEffect } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import LayerDrawer from './LayerDrawer';
import RefreshIcon from '@mui/icons-material/Refresh';
import useQueryParams from '@/hooks/useQueryParams';
import HomeSpeedDial from './HomeSpeedDial';
import useVisibilityChange from '@/hooks/useVisibilityChange';
import useRefresh from '@/hooks/useRefresh';
import { useActiveTopicContext } from '../AppPage/PageContext';
import useMapPost from '@/components/map/hooks/useMapPost';
import useMapSelected, {
    showSelectedPoint,
} from '@/components/map/hooks/useMapSelected';
import { useHomePageContext } from './PageContext';
import Marker from './Marker';
import SearchBar from './SearchBar';
import SelectedCard from './SelectedCard';
import { MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { getMapLibreFeatures } from '@/utils/helper';

export default function HomePage({ show = true }: { show?: boolean }) {
    const { myMap } = useMapLibreContext();
    const { activeTopicType } = useActiveTopicContext();
    const {
        apiQueryPost,
        listMapPost,
        locationStorage,
        showMarker,
        showCardSlider,
        setListScanData,
        setShowCardSlider,
    } = useHomePageContext();

    const [refresh, setRefresh] = useRefresh();

    useVisibilityChange('always', () => setRefresh());
    const { searchParams, ...queryParams } = useQueryParams();

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

    function onSelectedPost(
        e: MapMouseEvent & {
            features?: MapGeoJSONFeature[] | undefined;
        } & Object,
    ) {
        const listFeatures = getMapLibreFeatures(e);
        const listPostId: string[] = listFeatures.map(
            (item) => item.properties._id,
        );

        if (listPostId.length > 0) {
            const filteredPosts = listMapPost.filter((obj) =>
                listPostId.includes(obj._id),
            );
            if (filteredPosts.length > 0) {
                setListScanData(filteredPosts);
                setShowCardSlider(true);
                const topPostCoor = filteredPosts[0].location.coordinates;
                showSelectedPoint(myMap, topPostCoor[0], topPostCoor[1]);
            }
        }
    }

    useMapPost(listMapPost, activeTopicType, onSelectedPost);
    useMapSelected();

    // Fly To
    useEffect(() => {
        if (!show) return;
        if (!myMap) return;
        const flyToId = searchParams.get(QUERY.FLY_TO);
        const flyToLon = searchParams.get(QUERY.LON);
        const flyToLat = searchParams.get(QUERY.LAT);
        if (!flyToId || !flyToLon || !flyToLat) return;
        const thePost = listMapPost.find((item) => item._id === flyToId);
        if (thePost) {
            setListScanData([thePost]);
            setShowCardSlider(true);
        }

        myMap.flyTo({
            center: [Number(flyToLon), Number(flyToLat)],
            essential: true,
            zoom: 16,
            speed: 0.85,
            curve: 1,
        });
        showSelectedPoint(myMap, Number(flyToLon), Number(flyToLat));

        myMap.once('moveend', () => {
            queryParams.clearParams('replace');
        });
    }, [myMap, searchParams, show, listMapPost]);

    return (
        <>
            {showMarker && <Marker />}
            <Stack
                spacing={1}
                direction='row'
                className='absolute z-10 top-4 left-[1rem] w-[calc(100%-2rem)]'
            >
                <SearchBar />
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

            {!showCardSlider && <HomeSpeedDial activeParent={show} />}
            <SelectedCard />
        </>
    );
}
