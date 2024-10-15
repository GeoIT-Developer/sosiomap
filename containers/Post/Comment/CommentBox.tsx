import { Box, Card, Stack, Typography } from '@mui/material';
import { getMimeTypeFromURL } from '@/utils/helper';
import { CommentDataInterface } from '@/types/api/responses/comment-data.interface';
import ImageVideoStandard from '../View/ImageVideoStandard';
import SocialMediaPost from '../View/SocialMediaPost';
import HeaderSection from './HeaderSection';
import CommentReaction from '../Action/CommentReaction';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import { useState } from 'react';
import { ReactionEnum } from '@/types/reaction.enum';

type Props = {
    comment: CommentDataInterface;
};

export default function CommentBox({ comment: commentInput }: Props) {
    const [comment, setComment] = useState<CommentDataInterface>(commentInput);

    function onChangeReaction(stats: PostStatInterface, reactionId: string) {
        const newComment = { ...comment };
        newComment.stats = stats;
        newComment.reaction = reactionId as ReactionEnum;
        setComment(newComment);
    }

    return (
        <Card
            variant='elevation'
            elevation={5}
            sx={{ borderRadius: '8px', px: '1rem' }}
        >
            <Stack spacing={0.5}>
                <HeaderSection comment={comment} />
                <Stack spacing={0}>
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
                                fileType: getMimeTypeFromURL(item.file_url),
                                caption: item.caption,
                            }))}
                        />
                    </Box>
                </Stack>
                <SocialMediaPost
                    postUrlProps={comment.post_url}
                    defaultOpen='disable'
                />
                <div className='w-full flex justify-end items-end !ml-3'>
                    <CommentReaction
                        negative={comment.stats?.negative_reactions || 0}
                        positive={comment.stats?.positive_reactions || 0}
                        reactionId={comment.reaction}
                        commentId={comment._id}
                        onChangeStats={onChangeReaction}
                    />
                </div>
            </Stack>
        </Card>
    );
}
