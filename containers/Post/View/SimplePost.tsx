import {
    Box,
    Card,
    IconButton,
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
    formatDateTime,
    formatDistance,
    getMimeTypeFromURL,
    truncateText,
} from '@/utils/helper';
import { MyLocation } from '@/hooks/useGeolocation';
import ImageVideoSimple from './ImageVideoSimple';
import { useEffect, useState } from 'react';
import PostDrawer from './PostDrawer';
import useQueryParams from '@/hooks/useQueryParams';
import { useSearchParams } from 'next/navigation';
import MyAvatar from '@/components/preview/MyAvatar';
import ProfileDialog from '@/containers/ProfilePage/shared/ProfileDialog';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';

import MainReaction from '../Action/MainReaction';
import Views from '../Action/Views';
import Comments from '../Action/Comments';
import { MAX_LENGTH, POPUP_PARAMS } from '@/utils/constant';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';

export const SIMPLE_POST_HEIGHT = 233; //pixel

type Props = {
    post: MapPostDataInterface;
    style?: React.CSSProperties;
    userLocation: MyLocation | null;
    onChangeStats?: (stats: PostStatInterface, reactionId: string) => void;
};

export default function SimplePost({
    post,
    style,
    userLocation,
    onChangeStats,
}: Props) {
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
                queryParams.addParam(POPUP_PARAMS.POST_DETAIL.KEY, post._id);
            } else {
                queryParams.removeParam(POPUP_PARAMS.POST_DETAIL.KEY);
            }
        };

    useEffect(() => {
        if (!openDrawer) return;
        const postId = post._id;
        const postIdParams = searchParams.get(POPUP_PARAMS.POST_DETAIL.KEY);
        if (postIdParams !== postId) {
            setOpenDrawer(false);
        }
    }, [searchParams]);

    return (
        <>
            <Card
                style={style}
                className='my-1'
                variant='elevation'
                elevation={5}
                sx={{ borderRadius: '8px' }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <ProfileDialog
                            name={post.name}
                            username={post.username}
                            photo_url={post.photo_url}
                        >
                            <MyAvatar
                                name={post.name}
                                photo_url={post.photo_url}
                            />
                        </ProfileDialog>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <ProfileDialog
                                name={post.name}
                                username={post.username}
                                photo_url={post.photo_url}
                            >
                                <span className='cursor-pointer hover:underline active:underline'>
                                    {post.name}
                                    <span className='ml-1 text-slate-500'>
                                        @{post.username}
                                    </span>
                                </span>
                            </ProfileDialog>
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
                    className='px-4 cursor-pointer'
                    onClick={toggleDrawer(true)}
                >
                    {post.title && (
                        <Typography
                            component='p'
                            variant='body1'
                            className='block break-all whitespace-pre-line'
                        >
                            {truncateText(
                                post.title,
                                MAX_LENGTH.POST.SIMPLE.TITLE,
                            )}
                        </Typography>
                    )}

                    <Typography component='p' variant='body2'>
                        {truncateText(post.body, MAX_LENGTH.POST.SIMPLE.BODY)}
                        {post.body.length > MAX_LENGTH.POST.SIMPLE.BODY && (
                            <span
                                onClick={toggleDrawer(true)}
                                className='ml-2 text-primary hover:underline'
                            >
                                View More
                            </span>
                        )}
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
                </Stack>
                <Stack
                    direction='row'
                    className='px-2'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <MainReaction
                        negative={post.stats?.negative_reactions || 0}
                        positive={post.stats?.positive_reactions || 0}
                        reactionId={post.reaction}
                        postId={post._id}
                        onChangeStats={onChangeStats}
                    />
                    <div className='flex items-center'>
                        <Comments
                            value={post.stats?.comments || 0}
                            onClick={toggleDrawer(true)}
                        />
                    </div>
                    <div className='flex items-center'>
                        <Views value={post.stats?.views || 0} />
                    </div>
                    <div className='flex items-center'>
                        <IconButton aria-label='fly-to' size='medium'>
                            <FlightTakeoffRoundedIcon fontSize='inherit' />
                        </IconButton>
                    </div>
                </Stack>
            </Card>

            <PostDrawer
                post={post}
                userLocation={userLocation}
                toggleDrawer={toggleDrawer}
                openDrawer={openDrawer}
            />
        </>
    );
}
