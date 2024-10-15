import { Box } from '@mui/material';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { MyLocation } from '@/hooks/useGeolocation';
import PostTypeEnum from '@/types/post-type.enum';

import { useEffect, useState } from 'react';
import React from 'react';
import CommentPage from '../Comment';
import StandardPost from '../View/StandardPost';
import CarouselPost from '../View/CarouselPost';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { showError } from '@/utils';
import { useSession } from 'next-auth/react';

type Props = {
    userLocation: MyLocation | null;
    post: MapPostDataInterface;
};

export default function PostDetailContent({
    userLocation,
    post: postInput,
}: Props) {
    const session = useSession();
    const [post, setPost] = useState<MapPostDataInterface>(postInput);

    const apiGetDetailPost = useAPI<MapPostDataInterface, string>(
        API.getPublicPostById,
        {
            onSuccess(_, { data }) {
                setPost(data);
            },
            onError(err) {
                showError(err);
            },
        },
    );

    useEffect(() => {
        if (session.status !== 'authenticated') return;
        if (postInput) {
            apiGetDetailPost.call(postInput._id);
        }
    }, [postInput, session.status]);

    function onChangePost(ePost: MapPostDataInterface) {
        setPost(ePost);
    }

    return (
        <Box className='max-w-xl pb-16'>
            {post?.post_type === PostTypeEnum.STANDARD && (
                <StandardPost
                    post={post}
                    onChangePost={onChangePost}
                    userLocation={userLocation}
                />
            )}
            {post?.post_type === PostTypeEnum.CAROUSEL && (
                <CarouselPost
                    post={post}
                    onChangePost={onChangePost}
                    userLocation={userLocation}
                />
            )}
            <CommentPage
                postId={post._id}
                topicId={post.topic_id}
                commentValue={post.stats?.comments || 0}
            />
        </Box>
    );
}
