import {
    Box,
    Card,
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
import { cloneElement, useEffect } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import MyAvatar from '@/components/preview/MyAvatar';
import ProfileDialog from '@/containers/ProfilePage/shared/ProfileDialog';
import MainReaction from '../Action/MainReaction';
import Views from '../Action/Views';
import Comments from '../Action/Comments';
import { MAX_LENGTH, POPUP_PARAMS } from '@/utils/constant';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import React from 'react';
import FlyTo from '../Action/FlyTo';
import { useMainTopic } from '@/hooks/useTopic';
import { usePostDrawer } from './PostDrawerContext';

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
    const mainTopic = useMainTopic();
    const { toggleDrawer, refCallbackOpenDrawer, setPost } = usePostDrawer();

    const { searchParams, ...queryParams } = useQueryParams();

    function onOpenDrawer(open: boolean) {
        if (open) {
            queryParams.addParam(POPUP_PARAMS.POST_DETAIL.KEY, post._id);
        } else {
            queryParams.removeParam(POPUP_PARAMS.POST_DETAIL.KEY);
        }
    }
    refCallbackOpenDrawer.current = onOpenDrawer;

    const thisTopic = mainTopic.find((item) => item.id === post.topic_id);

    function onClickToggleDrawer(e: React.KeyboardEvent | React.MouseEvent) {
        setPost(post);
        toggleDrawer(true)(e);
    }

    return (
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
                        <MyAvatar name={post.name} photo_url={post.photo_url} />
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
                        <>
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
                            <div className='flex items-center'>
                                {thisTopic?.icon &&
                                    typeof thisTopic?.icon !== 'string' &&
                                    cloneElement(thisTopic?.icon, {
                                        sx: {
                                            color: thisTopic?.bgColor,
                                            height: '16px',
                                            width: '16px',
                                            marginRight: '4px',
                                        },
                                    })}
                                <Typography className='!text-xs'>
                                    {thisTopic?.label}
                                </Typography>
                            </div>
                        </>
                    }
                    secondaryTypographyProps={{
                        className: '!text-xs ',
                        component: 'div',
                    }}
                />
            </ListItem>
            <Stack
                spacing={0.5}
                className='px-4 cursor-pointer'
                onClick={onClickToggleDrawer}
            >
                {post.title && (
                    <Typography
                        component='p'
                        variant='body1'
                        className='block break-all whitespace-pre-line'
                    >
                        {truncateText(post.title, MAX_LENGTH.POST.SIMPLE.TITLE)}
                    </Typography>
                )}

                <Typography
                    component='p'
                    variant='body2'
                    className='!font-roboto'
                >
                    {truncateText(post.body, MAX_LENGTH.POST.SIMPLE.BODY)}
                    {post.body.length > MAX_LENGTH.POST.SIMPLE.BODY && (
                        <span
                            onClick={onClickToggleDrawer}
                            className='ml-2 text-primary hover:underline'
                        >
                            {t('post.see_more')}
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
                        onClick={onClickToggleDrawer}
                    />
                </div>
                <div className='flex items-center'>
                    <Views value={post.stats?.views || 0} />
                </div>
                <div className='flex items-center'>
                    <FlyTo post={post} />
                </div>
            </Stack>
        </Card>
    );
}
