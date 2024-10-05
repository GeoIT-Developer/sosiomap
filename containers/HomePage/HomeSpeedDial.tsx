import { Fade, Stack, Tooltip } from '@mui/material';
import { TopicType } from '@/hooks/useTopic';
import { ReactElement, useEffect, useState } from 'react';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import NewStoryButton from './NewStoryButton';
import MainFab from '@/components/button/MainFab';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NewPostDialog from './NewPostDialog';
import { MyLocation } from '@/hooks/useGeolocation';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Slider from 'react-slick';
import ScanButton from './ScanButton';
import SimplePost from '../Post/View/SimplePost';
import { useWideScreenContext } from '@/contexts/ResponsiveContext';

function SliderArrow(props: any) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{
                ...style,
                background: '#333',
                borderRadius: '16px',
                height: '8rem',
                paddingTop: '3.5rem',
            }}
            onClick={onClick}
        />
    );
}

type Props = {
    userLocation: MyLocation | null;
    posts: MapPostDataInterface[];
    setShowMarker: (_args: boolean) => void;
    selectedTopic: TopicType | null;
    setSelectedTopic: (_args: TopicType | null) => void;
    showMarker: boolean;
    activeParent: boolean;
};

export default function HomeSpeedDial({
    posts,
    selectedTopic,
    setSelectedTopic,
    setShowMarker,
    userLocation,
    showMarker,
    activeParent,
}: Props) {
    const [openDial, setOpenDial] = useState(false);
    const isWide = useWideScreenContext();
    const [showScanner, setShowScanner] = useState(false);
    const [listScanData, setListScanData] = useState<MapPostDataInterface[]>(
        [],
    );

    const handleClickDial = () => {
        setOpenDial((oldState) => !oldState);
    };

    useEffect(() => {
        if (!activeParent) {
            setOpenDial(false);
        }
    }, [activeParent]);

    function onChangeListScan(show: boolean, list: MapPostDataInterface[]) {
        setShowScanner(show);
        setListScanData(list);
    }

    return (
        <>
            {!showScanner && (
                <Stack
                    spacing={2}
                    className='absolute z-10 bottom-4 right-4 items-end'
                >
                    {openDial && (
                        <Stack spacing={2} className='items-end'>
                            {!showMarker && (
                                <>
                                    <NewStoryButton />
                                    <NewPostDialog
                                        setShowMarker={setShowMarker}
                                        selectedTopic={selectedTopic}
                                        setSelectedTopic={setSelectedTopic}
                                    />
                                </>
                            )}

                            <ScanButton
                                posts={posts}
                                onChangeListScan={onChangeListScan}
                            />
                        </Stack>
                    )}

                    <MainFab
                        aria-label='widget'
                        onClick={handleClickDial}
                        color='primary'
                    >
                        {openDial ? (
                            <CloseRoundedIcon />
                        ) : (
                            <WidgetsRoundedIcon />
                        )}
                    </MainFab>
                </Stack>
            )}

            <Fade in={showScanner} mountOnEnter unmountOnExit>
                <div className='w-full absolute bottom-0 z-[3]'>
                    <div className={`${isWide ? 'w-[90%]' : 'w-full'} mx-auto`}>
                        <MainFab
                            onClick={() => setShowScanner(false)}
                            color='error'
                            size='small'
                            sx={{
                                position: 'absolute',
                                bottom: '1rem',
                                right: '1rem',
                            }}
                        >
                            <KeyboardArrowDownIcon />
                        </MainFab>
                        <Slider
                            speed={500}
                            slidesToShow={isWide ? 2 : 1}
                            slidesToScroll={1}
                            adaptiveHeight
                            arrows={isWide}
                            centerMode={isWide}
                            className='center'
                            nextArrow={<SliderArrow />}
                            prevArrow={<SliderArrow />}
                        >
                            {listScanData.map((item) => {
                                return (
                                    <div key={item._id} className='px-2'>
                                        <SimplePost
                                            post={item}
                                            userLocation={userLocation}
                                        />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </Fade>
        </>
    );
}

export function TooltipSpeedDial({
    children,
    label,
}: {
    children: ReactElement;
    label: string;
}) {
    return (
        <Tooltip
            title={label}
            placement='left'
            arrow
            open
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 20],
                            },
                        },
                    ],
                },
            }}
            PopperProps={{
                sx: {
                    '& .MuiTooltip-tooltip': {
                        fontSize: '12px',
                    },
                    zIndex: 'auto',
                },
            }}
            style={{ zIndex: 'auto' }}
        >
            {children}
        </Tooltip>
    );
}
