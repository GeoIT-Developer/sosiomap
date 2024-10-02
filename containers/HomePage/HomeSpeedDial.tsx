import { Stack, Tooltip } from '@mui/material';
import { TopicType } from '@/hooks/useTopic';
import { ReactElement, useEffect, useState } from 'react';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import NewStoryButton from './NewStoryButton';
import MainFab from '@/components/button/MainFab';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NewPostDialog from './NewPostDialog';
import ScanDrawer from './ScanDrawer';
import { MyLocation } from '@/hooks/useGeolocation';

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

    const handleClickDial = () => {
        setOpenDial((oldState) => !oldState);
    };

    useEffect(() => {
        if (!activeParent) {
            setOpenDial(false);
        }
    }, [activeParent]);

    return (
        <>
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

                    <ScanDrawer posts={posts} userLocation={userLocation} />
                </Stack>
            )}

            <MainFab
                aria-label='widget'
                onClick={handleClickDial}
                color='primary'
            >
                {openDial ? <CloseRoundedIcon /> : <WidgetsRoundedIcon />}
            </MainFab>
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
