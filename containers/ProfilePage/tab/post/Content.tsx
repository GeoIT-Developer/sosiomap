import { Box, CircularProgress } from '@mui/material';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import PostWindow from './PostWindow';
import useLocalStorage from '@/hooks/useLocalStorage';
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
import useWindowHeight from '@/hooks/useWindowHeight';
import { SIMPLE_POST_HEIGHT } from '@/containers/Post/View/SimplePost';
import { useEffect, useState } from 'react';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import { ReactionEnum } from '@/types/reaction.enum';
import useAccessToken from '@/hooks/useAccessToken';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ObjectLiteral } from '@/types/object-literal.interface';
import MainFab from '@/components/button/MainFab';
import RefreshIcon from '@mui/icons-material/Refresh';

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

type Props = {
    type: 'my-post' | 'saved' | 'archived';
};

export default function PostContent({ type }: Props) {
    const accessToken = useAccessToken();
    const [listMapPost, setListMapPost] = useState<MapPostDataInterface[]>([]);
    const [locationStorage] = useLocalStorage<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const { fragmentHeightStyle, height } = useWindowHeight();
    const TheAPI =
        type === 'saved'
            ? API.getProfileSavedPosts
            : type === 'archived'
              ? API.getProfileArchivedPosts
              : API.getProfilePosts;

    const apiQueryPost = useAPI<ObjectLiteral, string, MapPostDataInterface[]>(
        TheAPI,
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

    function onChangeStat(stats: PostStatInterface, reactionId: string) {
        const newList = [...listMapPost];
        const findIndex = newList.findIndex(
            (item) => item._id === stats.post_id,
        );
        if (findIndex !== -1) {
            newList[findIndex].stats = stats;
            newList[findIndex].reaction = reactionId as ReactionEnum;
            setListMapPost(newList);
        }
    }

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
            <MainFab
                size='small'
                aria-label='refresh'
                className='!absolute top-1 right-1'
                onClick={() => apiQueryPost.call()}
                style={{ opacity: '0.65' }}
            >
                {apiQueryPost.loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <RefreshIcon />
                )}
            </MainFab>
            <PostWindow
                posts={listMapPost}
                userLocation={locationStorage}
                isLoading={apiQueryPost.loading}
                onChangeStats={onChangeStat}
            />
        </Box>
    );
}
