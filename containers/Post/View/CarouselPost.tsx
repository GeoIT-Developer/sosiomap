import {
    Box,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import { useI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import {
    calculateManhattanDistance,
    formatDateTime,
    formatDistance,
    getMimeTypeFromURL,
} from '@/utils/helper';
import { MyLocation } from '@/hooks/useGeolocation';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ImageVideoCarousel from './ImageVideoCarousel';
import SocialMediaPost from './SocialMediaPost';
import CommentPage from '../Comment';
import MyAvatar from '@/components/preview/MyAvatar';
import ProfileDialog from '@/containers/ProfilePage/shared/ProfileDialog';

type Props = {
    post: MapPostDataInterface;
    userLocation: MyLocation | null;
};

export default function CarouselPost({ post, userLocation }: Props) {
    const t = useI18n();
    return (
        <Box>
            <ListItem className='!px-0'>
                <ListItemAvatar>
                    <ProfileDialog
                        name={post.name}
                        username={post.username}
                        photo_url={post.photo_url}
                    >
                        <MyAvatar name={post.name} photo_url={post.photo_url} />
                    </ProfileDialog>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <ProfileDialog
                            name={post.name}
                            username={post.username}
                            photo_url={post.photo_url}
                        >
                            <span className='cursor-pointer hover:underline active:underline'>
                                {post.name}
                                <span className='ml-1 text-slate-500'>
                                    @{post.username}
                                </span>
                            </span>
                        </ProfileDialog>
                    }
                    primaryTypographyProps={{
                        className: '!text-sm ',
                    }}
                    secondary={
                        <div className='justify-between flex'>
                            <Typography className='!text-xs'>
                                {formatDateTime(
                                    post.createdAt,
                                    'DD MMM YYYY - HH:mm',
                                )}
                            </Typography>
                            <Typography className='!text-xs'>
                                {formatDistance(
                                    calculateManhattanDistance(
                                        userLocation?.latitude || 0,
                                        userLocation?.longitude || 0,
                                        post.location.coordinates[1],
                                        post.location.coordinates[0],
                                    ),
                                )}
                                {t('unit.km')}
                            </Typography>
                        </div>
                    }
                    secondaryTypographyProps={{
                        className: '!text-xs ',
                        component: 'div',
                    }}
                />
            </ListItem>
            <Stack spacing={1} className='!px-0'>
                {post.title && (
                    <Typography
                        component='p'
                        variant='body1'
                        className='block break-all whitespace-pre-line'
                    >
                        {post.title}
                    </Typography>
                )}

                <Box>
                    <ImageVideoCarousel
                        media={post.media.map((item) => ({
                            url: item.file_url,
                            fileType: getMimeTypeFromURL(item.file_url),
                            caption: item.caption,
                        }))}
                    />
                </Box>

                <Typography component='p' variant='body2'>
                    {post.body}
                </Typography>

                <Stack direction='row' spacing={2}>
                    <TextsmsOutlinedIcon fontSize='small' />
                    <FavoriteBorderOutlinedIcon fontSize='small' />
                    <BarChartOutlinedIcon fontSize='small' />
                </Stack>
            </Stack>
            <SocialMediaPost postUrlProps={post.post_url} />
            <Divider className='!mt-2'>{t('post.comment')}</Divider>
            <CommentPage postId={post._id} topicId={post.topic_id} />
        </Box>
    );
}
