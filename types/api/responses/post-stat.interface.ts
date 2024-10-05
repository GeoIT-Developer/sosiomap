import { ReactionEnum } from '@/types/reaction.enum';

export interface PostStatInterface {
    _id?: string;
    post_id?: string;
    __v?: number;
    item_type?: string;
    createdAt?: string;
    updatedAt?: string;
    bookmarks: number;
    comments: number;
    negative_reactions: number;
    positive_reactions: number;
    reactions: PostReactionInterface;
    shares: number;
    unique_views: number;
    views: number;
}

export type PostReactionInterface = Record<ReactionEnum, number>;
