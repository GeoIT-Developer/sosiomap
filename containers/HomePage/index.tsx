import {
    Autocomplete,
    Badge,
    Button,
    Fab,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import BasemapDrawer from '@/components/map/BasemapDrawer';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import SensorsIcon from '@mui/icons-material/Sensors';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NewPostDialog from './NewPostDialog';
import MyImage from '@/components/preview/MyImage';
import { ASSETS, QUERY, ROUTE } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import { getLngLat } from '@/utils/helper';
import { useI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import { TopicType } from '@/hooks/useTopic';
import ChooseLocationEnum from '@/types/choose-location.enum';
import LayerDrawer from './LayerDrawer';

export default function HomePage() {
    const t = useI18n();
    const router = useRouter();
    const [showMarker, setShowMarker] = useState(false);
    const { myMap } = useMapLibreContext();
    const [center, setCenter] = useState({ lng: 0, lat: 0 });
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);

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
        router.push(
            `${ROUTE.POST.NEW.URL}?${QUERY.LOCATION}=${ChooseLocationEnum.CHOOSE_ON_MAP}&${QUERY.LNG}=${center.lng}&${QUERY.LAT}=${center.lat}&${QUERY.TOPIC}=${selectedTopic?.id}`,
        );
    }

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
                        freeSolo
                        disableClearable
                        options={[].map((item) => item)}
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
                            />
                        )}
                        size='small'
                    />
                </Paper>
                <Fab
                    aria-label='notification'
                    size='small'
                    className='flex-shrink'
                >
                    <Badge badgeContent={2} color='error'>
                        <NotificationsIcon />
                    </Badge>
                </Fab>
            </Stack>

            <Stack spacing={1} className='absolute z-10 top-20 left-4'>
                <BasemapDrawer />
                <LayerDrawer />
            </Stack>

            <Stack spacing={2} className='absolute z-10 bottom-4 right-4'>
                {!showMarker && (
                    <NewPostDialog
                        setShowMarker={setShowMarker}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                    />
                )}

                <Fab
                    color='primary'
                    aria-label='edit'
                    size='medium'
                    onClick={() =>
                        toast.error('ERRR', {
                            theme: 'colored',
                        })
                    }
                >
                    <SensorsIcon />
                </Fab>
            </Stack>
        </>
    );
}
