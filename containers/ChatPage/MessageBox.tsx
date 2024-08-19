import { useScopedI18n } from '@/locales/client';
import {
    formatDateTime,
    formatDistance,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import {
    Avatar,
    Box,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import ProfileDialog from '../ProfilePage/shared/ProfileDialog';

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
            <ListItem className='!items-start'>
                <ListItemAvatar className='pt-1'>
                    <ProfileDialog
                        name={name}
                        username={username}
                        photo_url={photo_url}
                    >
                        {photo_url ? (
                            <Avatar
                                className='border border-2 border-gray-500 border-solid cursor-pointer hover:border-primary active:border-primary'
                                src={photo_url}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    fontWeight: 'bold',
                                    bgcolor: stringToColor(name),
                                    cursor: 'pointer',
                                }}
                            >
                                {nameToInitial(name)}
                            </Avatar>
                        )}
                    </ProfileDialog>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <ProfileDialog
                            name={name}
                            username={username}
                            photo_url={photo_url}
                        >
                            <span className='cursor-pointer hover:underline active:underline'>
                                {username}
                            </span>
                        </ProfileDialog>
                    }
                    primaryTypographyProps={{
                        className: '!text-sm ',
                    }}
                    secondary={
                        <>
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
                                className='text-right !text-xs !-mt-1.5 block'
                            >
                                {formatDistance(distance)}
                                {t('km')} | {formatDateTime(createdAt, 'HH:mm')}
                            </Typography>
                        </>
                    }
                    secondaryTypographyProps={{
                        component: 'div',
                    }}
                />
            </ListItem>
            <Divider />
        </Box>
    );
}
