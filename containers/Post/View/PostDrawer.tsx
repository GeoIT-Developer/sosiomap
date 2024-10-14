import { Box } from '@mui/material';
import { useI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { MyLocation } from '@/hooks/useGeolocation';
import CommonDrawer from '@/components/drawer/CommonDrawer';
import PostTypeEnum from '@/types/post-type.enum';
import StandardPost from './StandardPost';
import CarouselPost from './CarouselPost';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { useEffect, useState } from 'react';
import { showError } from '@/utils';
import { useWideScreenContext } from '@/contexts/ResponsiveContext';
import React from 'react';
import { usePostDrawer } from './PostDrawerContext';
import useQueryParams from '@/hooks/useQueryParams';
import { POPUP_PARAMS } from '@/utils/constant';
import MainFab from '@/components/button/MainFab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CommentPage from '../Comment';

type Props = {
    userLocation: MyLocation | null;
};

export default function PostDrawer({ userLocation }: Props) {
    const t = useI18n();
    const isWide = useWideScreenContext();
    const {
        post: postInput,
        openDrawer,
        toggleDrawer,
        setOpenDrawer,
    } = usePostDrawer();
    const { searchParams } = useQueryParams();

    const [post, setPost] = useState<MapPostDataInterface>();

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
        if (openDrawer && postInput) {
            setPost(postInput);
            apiGetDetailPost.call(postInput._id);
        }
    }, [openDrawer, postInput]);

    useEffect(() => {
        if (!openDrawer) return;
        const postIdParams = searchParams.get(POPUP_PARAMS.POST_DETAIL.KEY);
        if (!postIdParams) {
            setOpenDrawer(false);
        }
    }, [searchParams]);

    function onChangePost(ePost: MapPostDataInterface) {
        setPost(ePost);
    }

    return (
        <CommonDrawer
            key={post?._id}
            anchor={isWide ? 'right' : 'bottom'}
            open={openDrawer}
            toggleDrawer={toggleDrawer}
            title={t('post.post_details')}
            keepMounted={false}
            contentStyles={{ padding: 0 }}
        >
            <Box className='max-w-md pb-16'>
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
                {post && (
                    <CommentPage
                        postId={post._id}
                        topicId={post.topic_id}
                        commentValue={post.stats?.comments || 0}
                    />
                )}
            </Box>
            <MainFab
                onClick={toggleDrawer(false)}
                color='error'
                size='medium'
                sx={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                }}
            >
                <KeyboardArrowDownIcon />
            </MainFab>
        </CommonDrawer>
    );
}
