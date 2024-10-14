import { IconButton } from '@mui/material';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import useFormattingData from '@/hooks/useFormattingData';
import { shareUrl, showError } from '@/utils';
import { ROUTE } from '@/utils/constant';
import { useScopedI18n } from '@/locales/client';
import useAPI from '@/hooks/useAPI';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';
import API from '@/configs/api';

type Props = {
    postId: string;
    value: number;
    onChangeStats?: (stats: PostStatInterface) => void;
};

export default function Shares({ value, postId, onChangeStats }: Props) {
    const t = useScopedI18n('post');
    const { formattingData } = useFormattingData();
    const eVal = formattingData(value);

    const apiPostShare = useAPI<PostStatInterface, string>(API.postShare, {
        onSuccess: (_raw, res) => {
            if (onChangeStats) {
                onChangeStats(res.data);
            }
        },
        onError: (err) => {
            showError(err);
        },
    });

    function sharePost() {
        shareUrl(ROUTE.POST.DETAIL.setURL(postId), t('share_post'))
            .then(() => {
                apiPostShare.call(postId);
            })
            .catch((err) => {
                showError(err);
            });
    }
    return (
        <IconButton
            aria-label='comment'
            size='medium'
            className='space-x-1'
            onClick={sharePost}
        >
            <ShareRoundedIcon fontSize='inherit' />
            <span className='text-xs'>{eVal}</span>
        </IconButton>
    );
}
