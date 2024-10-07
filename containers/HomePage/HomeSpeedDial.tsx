import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import NewStoryButton from './NewStoryButton';
import MainFab from '@/components/button/MainFab';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NewPostDialog from './NewPostDialog';
import React from 'react';
import ScanButton from './ScanButton';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import { showSelectedPoint } from '@/components/map/hooks/useMapSelected';
import { useHomePageContext } from './PageContext';

type Props = {
    activeParent: boolean;
};

export default function HomeSpeedDial({ activeParent }: Props) {
    const { myMap } = useMapLibreContext();
    const {
        openDial,
        setOpenDial,
        setShowCardSlider,
        setListScanData,
        showMarker,
        listMapPost,
        setShowMarker,
    } = useHomePageContext();

    const handleClickDial = () => {
        setOpenDial((oldState) => !oldState);
    };

    useEffect(() => {
        if (!activeParent) {
            setOpenDial(false);
            setShowMarker(false);
        }
    }, [activeParent]);

    function handlePostScan(post: MapPostDataInterface) {
        if (!myMap) return;
        if (!post) return;
        const lon = post.location.coordinates[0];
        const lat = post.location.coordinates[1];
        myMap.flyTo({
            center: [lon, lat],
            essential: true,
            speed: 0.85,
        });
        showSelectedPoint(myMap, lon, lat);
    }

    function onChangeListScan(show: boolean, list: MapPostDataInterface[]) {
        setShowCardSlider(show);
        setListScanData(list);
        if (list.length > 0 && show) {
            if (!myMap) return;
            const post = list[0];
            handlePostScan(post);
        }
    }

    return (
        <Stack spacing={2} className='absolute z-10 bottom-4 right-4 items-end'>
            {openDial && (
                <Stack spacing={2} className='items-end'>
                    {!showMarker && (
                        <>
                            <NewStoryButton />
                            <NewPostDialog />
                        </>
                    )}
                    <ScanButton
                        posts={listMapPost}
                        onChangeListScan={onChangeListScan}
                    />
                </Stack>
            )}

            <MainFab
                aria-label='widget'
                onClick={handleClickDial}
                color='primary'
            >
                {openDial ? <CloseRoundedIcon /> : <WidgetsRoundedIcon />}
            </MainFab>
        </Stack>
    );
}
