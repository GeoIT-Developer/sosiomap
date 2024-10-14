import { Divider, Stack } from '@mui/material';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import SocialMediaPost from './SocialMediaPost';
import MainReaction from '../Action/MainReaction';
import FlyTo from '../Action/FlyTo';
import Bookmarks from '../Action/Bookmarks';
import Shares from '../Action/Shares';
import DetailStats from '../Action/DetailStats';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import { ReactionEnum } from '@/types/reaction.enum';

type Props = {
    post: MapPostDataInterface;
    onChangePost?: (post: MapPostDataInterface) => void;
};

export default function BottomSectionPost({ post, onChangePost }: Props) {
    const { stats } = post;

    function onChangeReaction(stats: PostStatInterface, reactionId: string) {
        if (!onChangePost) return;

        const newPost = { ...post };
        newPost.stats = stats;
        newPost.reaction = reactionId as ReactionEnum;
        onChangePost(newPost);
    }

    function onChangeStats(stats: PostStatInterface) {
        if (!onChangePost) return;

        const newPost = { ...post };
        newPost.stats = stats;
        onChangePost(newPost);
    }

    function onChangeBookmark(stats: PostStatInterface, isBookmarked: boolean) {
        if (!onChangePost) return;

        const newPost = { ...post };
        newPost.stats = stats;
        newPost.bookmarked = isBookmarked;
        onChangePost(newPost);
    }

    return (
        <Stack spacing={0.5} className='px-4'>
            <SocialMediaPost postUrlProps={post.post_url} />
            <Divider />
            <DetailStats post={post} />
            <Divider />
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <MainReaction
                    negative={stats?.negative_reactions || 0}
                    positive={stats?.positive_reactions || 0}
                    reactionId={post.reaction}
                    postId={post._id}
                    onChangeStats={onChangeReaction}
                />
                <div className='flex items-center'>
                    <Bookmarks
                        postId={post._id}
                        value={stats?.bookmarks || 0}
                        isBookmarked={post.bookmarked}
                        onChangeStats={onChangeBookmark}
                    />
                </div>
                <div className='flex items-center'>
                    <Shares
                        value={stats?.shares || 0}
                        postId={post._id}
                        onChangeStats={onChangeStats}
                    />
                </div>
                <div className='flex items-center'>
                    <FlyTo post={post} />
                </div>
            </Stack>
        </Stack>
    );
}
