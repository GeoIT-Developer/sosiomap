import {
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import { useI18n } from '@/locales/client';
import {
    formatDateTime,
    formatDistance,
    getMimeTypeFromURL,
} from '@/utils/helper';
import { CommentDataInterface } from '@/types/api/responses/comment-data.interface';
import ImageVideoStandard from '../View/ImageVideoStandard';
import SocialMediaPost from '../View/SocialMediaPost';
import MyAvatar from '@/components/preview/MyAvatar';
import ProfileDialog from '@/containers/ProfilePage/shared/ProfileDialog';

type Props = {
    comment: CommentDataInterface;
};

export default function CommentBox({ comment }: Props) {
    const t = useI18n();
    return (
        <Box>
            <ListItem className='!items-start'>
                <ListItemAvatar sx={{ paddingTop: '0.35rem' }}>
                    <ProfileDialog
                        name={comment.name}
                        username={comment.username}
                        photo_url={comment.photo_url}
                    >
                        <MyAvatar
                            name={comment.name}
                            photo_url={comment.photo_url}
                        />
                    </ProfileDialog>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <ProfileDialog
                            name={comment.name}
                            username={comment.username}
                            photo_url={comment.photo_url}
                        >
                            <span className='cursor-pointer hover:underline active:underline'>
                                {comment.name}
                                <span className='ml-1 text-slate-500'>
                                    @{comment.username}
                                </span>
                            </span>
                        </ProfileDialog>
                    }
                    primaryTypographyProps={{
                        className: '!text-sm ',
                    }}
                    secondary={
                        <Stack spacing={1}>
                            {comment.title && (
                                <Typography
                                    component='p'
                                    variant='body1'
                                    className='block break-all whitespace-pre-line'
                                >
                                    {comment.title}
                                </Typography>
                            )}

                            <Typography component='p' variant='body2'>
                                {comment.body}
                            </Typography>

                            <Box>
                                <ImageVideoStandard
                                    media={comment.media.map((item) => ({
                                        url: item.file_url,
                                        fileType: getMimeTypeFromURL(
                                            item.file_url,
                                        ),
                                        caption: item.caption,
                                    }))}
                                />
                            </Box>

                            <Typography
                                component='time'
                                variant='caption'
                                className='text-right !text-xs !mt-0 block'
                            >
                                {formatDateTime(
                                    comment.createdAt,
                                    'HH:mm, DD MMM',
                                )}
                                {' | '}
                                {formatDistance(comment.distance)}
                                {t('unit.km')}
                            </Typography>
                        </Stack>
                    }
                    secondaryTypographyProps={{
                        component: 'div',
                    }}
                />
            </ListItem>
            <SocialMediaPost postUrlProps={comment.post_url} />
        </Box>
    );
}
