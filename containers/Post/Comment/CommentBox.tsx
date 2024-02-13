import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import { useI18n } from '@/locales/client';
import {
    addMinioPrefix,
    extractUsernameFromEmail,
    formatDateTime,
    formatDistance,
    getMimeTypeFromURL,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import { CommentDataInterface } from '@/types/api/responses/comment-data.interface';
import ImageVideoStandard from '../View/ImageVideoStandard';
import SocialMediaPost from '../View/SocialMediaPost';

type Props = {
    comment: CommentDataInterface;
};

export default function CommentBox({ comment }: Props) {
    const t = useI18n();
    return (
        <Box>
            <ListItem className='!items-start cursor-pointer'>
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            fontWeight: 'bold',
                            bgcolor: stringToColor(comment.name),
                        }}
                    >
                        {nameToInitial(comment.name)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <>
                            {comment.name}
                            <span className='ml-1 text-slate-500'>
                                @{extractUsernameFromEmail(comment.username)}
                            </span>
                        </>
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
                                        url: addMinioPrefix(item.file_url),
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
