import { useScopedI18n } from '@/locales/client';
import { formatDateTime, formatDistance, stringToColor } from '@/utils/helper';
import {
    Box,
    Card,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import ProfileDialog from '../ProfilePage/shared/ProfileDialog';
import MyAvatar from '@/components/preview/MyAvatar';

type Props = {
    username: string;
    name: string;
    body: string;
    createdAt: string;
    distance: number;
    photo_url?: string;
    style?: React.CSSProperties;
};

export default function MessageBox({
    username,
    name,
    body,
    createdAt,
    distance,
    photo_url,
    style,
}: Props) {
    const t = useScopedI18n('unit');
    return (
        <Box style={style}>
            <ListItem className='!items-start !py-1'>
                <ListItemAvatar
                    className='pt-1'
                    sx={{ minWidth: 'auto !important', marginRight: '0.5rem' }}
                >
                    <ProfileDialog
                        name={name}
                        username={username}
                        photo_url={photo_url}
                    >
                        <MyAvatar name={name} photo_url={photo_url} />
                    </ProfileDialog>
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <Card
                            className='p-2 m-0'
                            variant='elevation'
                            elevation={3}
                            sx={{
                                borderRadius: '8px',
                                borderStartStartRadius: 0,
                            }}
                        >
                            <ProfileDialog
                                name={name}
                                username={username}
                                photo_url={photo_url}
                            >
                                <Typography
                                    component='b'
                                    className='cursor-pointer hover:underline active:underline !font-bold'
                                    sx={{ color: stringToColor(name) }}
                                >
                                    {username}
                                </Typography>
                            </ProfileDialog>
                            <Typography
                                component='p'
                                variant='body2'
                                className='block break-all whitespace-pre-line'
                            >
                                {body}
                            </Typography>

                            <Typography
                                component='time'
                                variant='caption'
                                className='text-right !text-xs !-mt-1.5 block opacity-50'
                            >
                                {formatDistance(distance)}
                                {t('km')} | {formatDateTime(createdAt, 'HH:mm')}
                            </Typography>
                        </Card>
                    }
                />
            </ListItem>
        </Box>
    );
}
