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

    return (
        <CommonDrawer
            key={post?._id}
            anchor={isWide ? 'right' : 'bottom'}
            open={openDrawer}
            toggleDrawer={toggleDrawer}
            title={t('post.view_post')}
            keepMounted={false}
        >
            <Box className='!min-h-[85vh] max-w-md'>
                {post?.post_type === PostTypeEnum.STANDARD && (
                    <StandardPost post={post} userLocation={userLocation} />
                )}
                {post?.post_type === PostTypeEnum.CAROUSEL && (
                    <CarouselPost post={post} userLocation={userLocation} />
                )}
            </Box>
        </CommonDrawer>
    );
}
