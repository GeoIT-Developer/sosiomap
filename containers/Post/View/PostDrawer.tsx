import { Box } from '@mui/material';
import { useI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { MyLocation } from '@/hooks/useGeolocation';
import CommonDrawer from '@/components/drawer/CommonDrawer';
import useWideScreen from '@/hooks/useWideScreen';
import PostTypeEnum from '@/types/post-type.enum';
import StandardPost from './StandardPost';
import CarouselPost from './CarouselPost';

type Props = {
    post: MapPostDataInterface;
    userLocation: MyLocation | null;
    toggleDrawer: (
        open: boolean,
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    openDrawer: boolean;
};

export default function PostDrawer({
    post,
    userLocation,
    toggleDrawer,
    openDrawer,
}: Props) {
    const t = useI18n();
    const isWide = useWideScreen();

    return (
        <>
            <CommonDrawer
                key={post._id}
                anchor={isWide ? 'right' : 'bottom'}
                open={openDrawer}
                toggleDrawer={toggleDrawer}
                title={t('post.view_post')}
                keepMounted={false}
            >
                <Box className='!min-h-[85vh]'>
                    {post.post_type === PostTypeEnum.STANDARD && (
                        <StandardPost post={post} userLocation={userLocation} />
                    )}
                    {post.post_type === PostTypeEnum.CAROUSEL && (
                        <CarouselPost post={post} userLocation={userLocation} />
                    )}
                </Box>
            </CommonDrawer>
        </>
    );
}
