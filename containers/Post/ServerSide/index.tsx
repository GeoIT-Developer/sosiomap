'use client';

import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { Alert, AlertTitle, Box, Paper } from '@mui/material';
import { useI18n } from '@/locales/client';
import useWindowHeight from '@/hooks/useWindowHeight';
import { useEffect } from 'react';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import PostDetailContent from './Content';
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
import useLocalStorage from '@/hooks/useLocalStorage';

type Props = {
    post: MapPostDataInterface;
    status?: {
        code: number;
        message: string;
    };
};

export default function PostPage({ post, status }: Props) {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();
    const [userLocation] = useLocalStorage<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );

    // @ts-ignore
    const postByTitle = t('post.post_by_user', { value: post.username });

    useEffect(() => {
        document.title = t('app.name') + ' - ' + postByTitle;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BackAppBar title={postByTitle} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto md:p-4'
            >
                <Paper
                    className='max-w-xl mx-auto flex flex-col'
                    style={{ minHeight: heightStyleAppBar }}
                >
                    {status?.code === 200 ? (
                        <PostDetailContent
                            post={post}
                            userLocation={userLocation}
                        />
                    ) : (
                        <Alert severity='error'>
                            <AlertTitle>Error</AlertTitle>
                            {status?.message}
                        </Alert>
                    )}
                </Paper>
            </Box>
        </div>
    );
}
