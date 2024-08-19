import { Box } from '@mui/material';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import PostWindow from './PostWindow';
import useLocalStorage from '@/hooks/useLocalStorage';
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
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

type Props = {
    listMapPost: MapPostDataInterface[];
    isLoading: boolean;
};

export default function PostContent({ listMapPost, isLoading }: Props) {
    const [locationStorage] = useLocalStorage<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const { fragmentHeightStyle, height } = useWindowHeight();

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
            />
        </Box>
    );
}
