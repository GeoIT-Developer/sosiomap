import { useEffect, useState } from 'react';
import Reaction, { LIST_REACTION, ReactionType } from './Reaction';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { toast } from 'react-toastify';
import useRefresh from '@/hooks/useRefresh';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';

type Props = {
    positive: number;
    negative: number;
    reactionId: string | undefined | null;
    commentId: string;
    onChangeStats?: (stats: PostStatInterface, reactionId: string) => void;
};

type ReactionState = {
    id: string;
    type: ReactionType | '';
    positive: number;
    negative: number;
};

export default function CommentReaction({
    negative,
    positive,
    reactionId,
    commentId,
    onChangeStats,
}: Props) {
    const [reaction, setReaction] = useState<ReactionState>({
        id: '',
        type: '',
        positive: 0,
        negative: 0,
    });
    const [refresh, setRefresh] = useRefresh();

    const apiCommentReaction = useAPI<
        PostStatInterface,
        {
            comment_id: string;
            reaction: string;
        }
    >(API.commentReact, {
        onSuccess: (raw, res) => {
            const newPos = raw?.data?.positive_reactions;
            const newNeg = raw?.data?.negative_reactions;
            setReaction((oldState) => {
                return { ...oldState, positive: newPos, negative: newNeg };
            });
            if (onChangeStats) {
                onChangeStats(res.data, res.params?.reaction || '');
            }
        },
        onError: (err) => {
            setRefresh();
            toast.error(err, {
                theme: 'colored',
            });
        },
    });

    useEffect(() => {
        let eType: ReactionType | '' = '';
        if (reactionId) {
            const eReact = LIST_REACTION.find((item) => item.id === reactionId);
            eType = eReact?.type || '';
        }
        setReaction({
            id: reactionId || '',
            positive,
            negative,
            type: eType,
        });
    }, [reactionId, positive, negative, refresh]);

    function onReactionChange(react_id: string, type: ReactionType) {
        setReaction((oldState) => {
            let ePos = oldState.positive;
            let eNeg = oldState.negative;
            const newState: ReactionState = {
                ...oldState,
                id: react_id,
                type: '',
            };
            if (oldState.type === 'positive') ePos--;
            if (oldState.type === 'negative') eNeg--;
            if (react_id) {
                if (type === 'positive') ePos++;
                if (type === 'negative') eNeg++;
                newState.type = type;
            }
            newState.positive = ePos;
            newState.negative = eNeg;
            return newState;
        });
        apiCommentReaction.call({ comment_id: commentId, reaction: react_id });
    }

    return (
        <div className='flex'>
            <div className='flex items-center'>
                <Reaction
                    type='positive'
                    value={reaction.positive}
                    reaction={reaction.id}
                    onChangeReaction={(val) =>
                        onReactionChange(val || '', 'positive')
                    }
                />
            </div>
            <div className='flex items-center'>
                <Reaction
                    type='negative'
                    value={reaction.negative}
                    reaction={reaction.id}
                    onChangeReaction={(val) =>
                        onReactionChange(val || '', 'negative')
                    }
                />
            </div>
        </div>
    );
}
