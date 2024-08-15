import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API from '@/configs/api';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import PostWindow from './PostWindow';
import useLocalStorage from '@/hooks/useLocalStorage';
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
import useAccessToken from '@/hooks/useAccessToken';
import useWindowHeight from '@/hooks/useWindowHeight';
import { SIMPLE_POST_HEIGHT } from '@/containers/Post/View/SimplePost';

function getMinimunHeight(
    screenHeight: number,
    dataLength: number,
    maxHeight: string,
) {
    const dataHeight = dataLength * SIMPLE_POST_HEIGHT;

    if (screenHeight > dataHeight) {
        return `calc(${dataHeight}px + 3rem)`;
    } else {
        return maxHeight;
    }
}

export default function PostTab() {
    const accessToken = useAccessToken();
    const [listMapPost, setListMapPost] = useState<MapPostDataInterface[]>([]);
    const [locationStorage] = useLocalStorage<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const { fragmentHeightStyle, height } = useWindowHeight();

    const apiQueryPost = useAPI<ObjectLiteral, string, MapPostDataInterface[]>(
        API.getProfilePosts,
        {
            listkey: 'data',
            onSuccess: (_raw, res) => {
                setListMapPost(res?.list || []);
            },
        },
    );

    useEffect(() => {
        if (!accessToken?.sub) return;
        apiQueryPost.call();
    }, [accessToken?.sub]);

    return (
        <Box
            className='py-4'
            sx={{
                minHeight: getMinimunHeight(
                    height,
                    listMapPost.length,
                    fragmentHeightStyle,
                ),
            }}
        >
            <PostWindow
                posts={listMapPost}
                userLocation={locationStorage}
                isLoading={apiQueryPost.loading}
            />
        </Box>
    );
}
