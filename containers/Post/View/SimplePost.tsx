import {
    Avatar,
    Box,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import { useI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import {
    calculateManhattanDistance,
    extractUsernameFromEmail,
    formatDateTime,
    formatDistance,
    getMimeTypeFromURL,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import { MyLocation } from '@/hooks/useGeolocation';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ImageVideoSimple from './ImageVideoSimple';
import { useState } from 'react';
import PostDrawer from './PostDrawer';

type Props = {
    post: MapPostDataInterface;
    style?: React.CSSProperties;
    userLocation: MyLocation | null;
};

export default function SimplePost({ post, style, userLocation }: Props) {
    const t = useI18n();
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event) {
                event.stopPropagation();
            }
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setOpenDrawer(open);
        };

    return (
        <>
            <Box style={style}>
                <ListItem
                    className='!items-start cursor-pointer'
                    onClick={toggleDrawer(true)}
                >
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                fontWeight: 'bold',
                                bgcolor: stringToColor(post.name),
                            }}
                        >
                            {nameToInitial(post.name)}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                {post.name}
                                <span className='ml-1 text-slate-500'>
                                    @{extractUsernameFromEmail(post.username)}
                                </span>
                            </>
                        }
                        primaryTypographyProps={{
                            className: '!text-sm ',
                        }}
                        secondary={
                            <Stack spacing={1}>
                                {post.title && (
                                    <Typography
                                        component='p'
                                        variant='body1'
                                        className='block break-all whitespace-pre-line'
                                    >
                                        {post.title}
                                    </Typography>
                                )}

                                <Typography component='p' variant='body2'>
                                    {post.body}
                                </Typography>

                                <Box>
                                    <ImageVideoSimple
                                        media={post.media.map((item) => ({
                                            url: item.file_url,
                                            fileType: getMimeTypeFromURL(
                                                item.file_url,
                                            ),
                                            caption: item.caption,
                                        }))}
                                    />
                                </Box>

                                <Stack direction='row' spacing={2}>
                                    <TextsmsOutlinedIcon fontSize='small' />
                                    <FavoriteBorderOutlinedIcon fontSize='small' />
                                    <BarChartOutlinedIcon fontSize='small' />
                                </Stack>
                                <Typography
                                    component='time'
                                    variant='caption'
                                    className='text-right !text-xs !-mt-4 block'
                                >
                                    {formatDateTime(
                                        post.createdAt,
                                        'HH:mm, DD MMM',
                                    )}
                                    {' | '}
                                    {formatDistance(
                                        calculateManhattanDistance(
                                            userLocation?.latitude || 0,
                                            userLocation?.longitude || 0,
                                            post.location.coordinates[1],
                                            post.location.coordinates[0],
                                        ),
                                    )}
                                    {t('unit.km')}
                                </Typography>
                            </Stack>
                        }
                        secondaryTypographyProps={{
                            component: 'div',
                        }}
                    />
                </ListItem>
                <Divider />
            </Box>

            <PostDrawer
                post={post}
                userLocation={userLocation}
                toggleDrawer={toggleDrawer}
                openDrawer={openDrawer}
            />
        </>
    );
}
