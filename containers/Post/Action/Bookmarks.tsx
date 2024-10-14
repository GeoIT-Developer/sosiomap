import { IconButton } from '@mui/material';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import useFormattingData from '@/hooks/useFormattingData';
import useAPI from '@/hooks/useAPI';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import API from '@/configs/api';
import { showError } from '@/utils';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
    value: number;
    onChangeStats?: (stats: PostStatInterface, isBookmarked: boolean) => void;
    isBookmarked?: boolean;
    postId: string;
};

export default function Bookmarks({
    value,
    onChangeStats,
    isBookmarked: isBookmarkedInput,
    postId,
}: Props) {
    const session = useSession();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { formattingData } = useFormattingData();

    const apiPostBookmark = useAPI<
        PostStatInterface,
        {
            post_id: string;
            bookmark: boolean;
        }
    >(API.postBookmark, {
        onSuccess: (_raw, res) => {
            if (onChangeStats) {
                onChangeStats(res.data, res.params?.bookmark || false);
            }
        },
        onError: (err) => {
            showError(err);
        },
    });

    useEffect(() => {
        if (isBookmarkedInput === undefined) return;
        setIsBookmarked(isBookmarkedInput);
    }, [isBookmarkedInput]);

    function onClickBookmark() {
        const newBookmarked = !isBookmarked;
        setIsBookmarked(newBookmarked);
        apiPostBookmark.call({ post_id: postId, bookmark: newBookmarked });
    }

    return (
        <IconButton
            aria-label='bookmark'
            size='medium'
            className='space-x-1'
            onClick={onClickBookmark}
            disabled={session.status !== 'authenticated'}
        >
            {isBookmarked ? (
                <BookmarkRoundedIcon
                    fontSize='inherit'
                    style={{
                        color: 'orange',
                    }}
                />
            ) : (
                <BookmarkBorderRoundedIcon fontSize='inherit' />
            )}

            <span
                className='text-xs'
                style={{
                    color: isBookmarked ? 'orange' : 'inherit',
                    fontWeight: isBookmarked ? 'bold' : 'inherit',
                }}
            >
                {formattingData(value)}
            </span>
        </IconButton>
    );
}
