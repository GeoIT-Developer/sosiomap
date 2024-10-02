import { Box } from '@mui/material';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import PostWindow from './PostWindow';
import useLocalStorage from '@/hooks/useLocalStorage';
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
import useWindowHeight from '@/hooks/useWindowHeight';
import { SIMPLE_POST_HEIGHT } from '@/containers/Post/View/SimplePost';
import { Dispatch, SetStateAction } from 'react';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import { ReactionEnum } from '@/types/reaction.enum';

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
    listMapPost: MapPostDataInterface[];
    isLoading: boolean;
    setListMapPost: Dispatch<SetStateAction<MapPostDataInterface[]>>;
};

export default function PostContent({
    listMapPost,
    isLoading,
    setListMapPost,
}: Props) {
    const [locationStorage] = useLocalStorage<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const { fragmentHeightStyle, height } = useWindowHeight();

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
            <PostWindow
                posts={listMapPost}
                userLocation={locationStorage}
                isLoading={isLoading}
                onChangeStats={onChangeStat}
            />
        </Box>
    );
}
