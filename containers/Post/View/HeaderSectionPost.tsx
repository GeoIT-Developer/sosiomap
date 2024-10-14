import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { useI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import {
    calculateManhattanDistance,
    formatDateTime,
    formatDistance,
} from '@/utils/helper';
import { MyLocation } from '@/hooks/useGeolocation';
import MyAvatar from '@/components/preview/MyAvatar';
import ProfileDialog from '@/containers/ProfilePage/shared/ProfileDialog';
import React from 'react';
import TopicIcon from './TopicIcon';
import PostOwner from '../Action/PostOwner';
import useAccessToken from '@/hooks/useAccessToken';

type Props = {
    post: MapPostDataInterface;
    userLocation: MyLocation | null;
    showMore?: boolean;
};

export default function HeaderSectionPost({
    post,
    userLocation,
    showMore,
}: Props) {
    const t = useI18n();
    const accessToken = useAccessToken();

    return (
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
                            <TopicIcon topicId={post.topic_id} />
                        </div>
                        {accessToken?.preferred_username === post.username &&
                            showMore && (
                                <div className='absolute right-0 top-0'>
                                    <PostOwner
                                        postId={post._id}
                                        isArchived={Boolean(post.archivedAt)}
                                    />
                                </div>
                            )}
                    </>
                }
                secondaryTypographyProps={{
                    className: '!text-xs',
                    component: 'div',
                }}
            />
        </ListItem>
    );
}
