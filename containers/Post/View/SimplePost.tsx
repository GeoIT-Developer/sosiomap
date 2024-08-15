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
import { useEffect, useState } from 'react';
import PostDrawer from './PostDrawer';
import useQueryParams from '@/hooks/useQueryParams';
import { useSearchParams } from 'next/navigation';

export const SIMPLE_POST_HEIGHT = 233; //pixel

type Props = {
    post: MapPostDataInterface;
    style?: React.CSSProperties;
    userLocation: MyLocation | null;
};

export default function SimplePost({ post, style, userLocation }: Props) {
    const t = useI18n();
    const [openDrawer, setOpenDrawer] = useState(false);

    const queryParams = useQueryParams();
    const searchParams = useSearchParams();

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
            if (open) {
                queryParams.addParam('post-id', post._id);
            } else {
                queryParams.clearParams();
            }
        };

    useEffect(() => {
        if (!openDrawer) return;
        const postId = post._id;
        const postIdParams = searchParams.get('post-id');
        if (postIdParams !== postId) {
            setOpenDrawer(false);
        }
    }, [searchParams]);

    return (
        <>
            <Box style={style}>
                <ListItem>
                    <ListItemAvatar>
                        {post.photo_url ? (
                            <Avatar
                                className='border border-gray-500 border-solid'
                                src={post.photo_url}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    fontWeight: 'bold',
                                    bgcolor: stringToColor(post.name),
                                }}
                            >
                                {nameToInitial(post.name)}
                            </Avatar>
                        )}
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
                            <div className='justify-between flex'>
                                <Typography className='!text-xs'>
                                    {formatDateTime(
                                        post.createdAt,
                                        'DD MMM YYYY - HH:mm',
                                    )}
                                </Typography>
                                <Typography className='!text-xs'>
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
                            </div>
                        }
                        secondaryTypographyProps={{
                            className: '!text-xs ',
                            component: 'div',
                        }}
                    />
                </ListItem>
                <Stack
                    spacing={1}
                    className='px-4 pb-4 cursor-pointer'
                    onClick={toggleDrawer(true)}
                >
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
                                fileType: getMimeTypeFromURL(item.file_url),
                                caption: item.caption,
                            }))}
                        />
                    </Box>

                    <Stack direction='row' spacing={2}>
                        <TextsmsOutlinedIcon fontSize='small' />
                        <FavoriteBorderOutlinedIcon fontSize='small' />
                        <BarChartOutlinedIcon fontSize='small' />
                    </Stack>
                </Stack>
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
