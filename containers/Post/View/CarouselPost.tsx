import { Box, Card, Stack, Typography } from '@mui/material';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { getMimeTypeFromURL } from '@/utils/helper';
import { MyLocation } from '@/hooks/useGeolocation';
import ImageVideoCarousel from './ImageVideoCarousel';
import HeaderSectionPost from './HeaderSectionPost';
import BottomSectionPost from './BottomSectionPost';

type Props = {
    post: MapPostDataInterface;
    userLocation: MyLocation | null;
    onChangePost?: (post: MapPostDataInterface) => void;
};

export default function CarouselPost({
    post,
    userLocation,
    onChangePost,
}: Props) {
    return (
        <Card
            variant='elevation'
            elevation={5}
            sx={{ borderRadius: '8px' }}
            className='pb-1 mx-1'
        >
            <HeaderSectionPost post={post} userLocation={userLocation} />
            <Stack spacing={1} className='px-4'>
                {post.title && (
                    <Typography
                        component='p'
                        variant='body1'
                        className='block break-all whitespace-pre-line'
                    >
                        {post.title}
                    </Typography>
                )}

                <Box className='!-mx-4'>
                    <ImageVideoCarousel
                        media={post.media.map((item) => ({
                            url: item.file_url,
                            fileType: getMimeTypeFromURL(item.file_url),
                            caption: item.caption,
                        }))}
                    />
                </Box>

                <Typography
                    component='p'
                    variant='body2'
                    className='!text-sm whitespace-break-spaces !font-roboto'
                >
                    {post.body}
                </Typography>
            </Stack>
            <BottomSectionPost post={post} onChangePost={onChangePost} />
        </Card>
    );
}
