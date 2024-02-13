import {
    Avatar,
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
    extractUsernameFromEmail,
    formatDateTime,
    formatDistance,
    getMimeTypeFromURL,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import { MyLocation } from '@/hooks/useGeolocation';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ImageVideoCarousel from './ImageVideoCarousel';
import SocialMediaPost from './SocialMediaPost';
import CommentPage from '../Comment';

type Props = {
    post: MapPostDataInterface;
    userLocation: MyLocation | null;
};

export default function CarouselPost({ post, userLocation }: Props) {
    const t = useI18n();
    return (
        <Box>
            <ListItem className='!items-start cursor-pointer'>
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            fontWeight: 'bold',
                            bgcolor: stringToColor(post.name),
                        }}
                    >
                        {nameToInitial(post.name)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <>
                            {post.name}
                            <span className='ml-1 text-slate-500'>
                                @{extractUsernameFromEmail(post.username)}
                            </span>
                        </>
                    }
                    primaryTypographyProps={{
                        className: '!text-sm ',
                    }}
                    secondary={
                        <Stack spacing={1}>
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
                                        fileType: getMimeTypeFromURL(
                                            item.file_url,
                                        ),
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
                            <Typography
                                component='time'
                                variant='caption'
                                className='text-right !text-xs !-mt-4 block'
                            >
                                {formatDateTime(
                                    post.createdAt,
                                    'HH:mm, DD MMM',
                                )}
                                {' | '}
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
                        </Stack>
                    }
                    secondaryTypographyProps={{
                        component: 'div',
                    }}
                />
            </ListItem>
            <SocialMediaPost postUrlProps={post.post_url} />
            <Divider className='!mt-2'>{t('post.comment')}</Divider>
            <CommentPage postId={post._id} />
        </Box>
    );
}
