import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import {
    Alert,
    AlertTitle,
    Avatar,
    DialogContent,
    Fab,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import AddLocationAltOutlined from '@mui/icons-material/AddLocationAltOutlined';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import { QUERY, ROUTE } from '@/utils/constant';
import useGeolocation from '@/hooks/useGeolocation';
import { TopicType } from '@/hooks/useTopic';
import SelectTopic from '@/components/input/SelectTopic';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ChooseLocationEnum from '@/types/choose-location.enum';
import { toast } from 'react-toastify';

interface SimpleDialogProps {
    setShowMarker: (_args: boolean) => void;
    selectedTopic: TopicType | null;
    setSelectedTopic: (_args: TopicType | null) => void;
}

export default function NewPostDialog({
    setShowMarker,
    selectedTopic,
    setSelectedTopic,
}: SimpleDialogProps) {
    const router = useRouter();
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const geolocation = useGeolocation();

    useEffect(() => {
        if (open) {
            geolocation.requestGeolocation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Fab
                aria-label='new_post'
                size='medium'
                onClick={() => setOpen(true)}
            >
                <AddLocationAltOutlined />
            </Fab>
            <Dialog onClose={handleClose} open={open} className='-mt-32'>
                <DialogTitle className='!px-4'>
                    {t('post.new_post')}
                </DialogTitle>
                <DialogContent className='min-w-64 !p-0'>
                    <SelectTopic
                        size='medium'
                        selectedTopic={selectedTopic}
                        onSelectTopic={(val) => setSelectedTopic(val)}
                        labelClass='mx-4'
                        className='my-4 mx-4'
                    />
                    {selectedTopic?.id && (
                        <>
                            <InputLabel className='mx-4'>
                                {t('post.choose_location')}
                            </InputLabel>
                            {geolocation.error && (
                                <Alert severity='error'>
                                    <AlertTitle>{geolocation.error}</AlertTitle>
                                    {t(
                                        'message.error.feature_need_geolocation',
                                    )}
                                </Alert>
                            )}
                            {geolocation.permissionGranted && (
                                <List sx={{ pt: 0 }}>
                                    {selectedTopic.location
                                        ?.useCurrentLocation && (
                                        <ListItem disableGutters>
                                            <ListItemButton
                                                autoFocus
                                                onClick={() => {
                                                    handleClose();
                                                    router.push(
                                                        `${ROUTE.POST.NEW.URL}?${QUERY.LOCATION}=${ChooseLocationEnum.USE_CURRENT_LOCATION}&${QUERY.TOPIC}=${selectedTopic?.id}`,
                                                    );
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <GpsFixedIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={t(
                                                        'post.use_current_location',
                                                    )}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                    {selectedTopic.location?.chooseOnMap && (
                                        <ListItem disableGutters>
                                            <ListItemButton
                                                autoFocus
                                                onClick={() => {
                                                    handleClose();
                                                    setShowMarker(true);
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PinDropIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={t(
                                                        'post.choose_on_map',
                                                    )}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                    {selectedTopic.location
                                        ?.useApproximateLocation && (
                                        <ListItem disableGutters>
                                            <ListItemButton
                                                autoFocus
                                                onClick={() => {
                                                    handleClose();
                                                    router.push(
                                                        `${ROUTE.POST.NEW.URL}?${QUERY.LOCATION}=${ChooseLocationEnum.USE_APPROXIMATE_LOCATION}&${QUERY.TOPIC}=${selectedTopic?.id}`,
                                                    );
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ShareLocationIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={t(
                                                        'post.use_approximate_location',
                                                    )}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                    {selectedTopic.location?.drawOnMap && (
                                        <ListItem disableGutters>
                                            <ListItemButton
                                                autoFocus
                                                onClick={() =>
                                                    toast.info(
                                                        t(
                                                            'message.info.coming_soon',
                                                        ),
                                                        {
                                                            theme: 'colored',
                                                        },
                                                    )
                                                }
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PolylineIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={t(
                                                        'post.draw_on_map',
                                                    )}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                </List>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
