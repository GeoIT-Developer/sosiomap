import { IconButton } from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import useFormattingData from '@/hooks/useFormattingData';
import TooltipClick from '@/components/tooltip/TooltipClick';

type Props = {
    value: number;
};

export default function Views({ value }: Props) {
    const t = useScopedI18n('post.statistic');
    const { formattingData } = useFormattingData();

    const eVal = formattingData(value);
    // @ts-ignore
    const eTitle = t('views', { value: eVal });
    return (
        <TooltipClick title={eTitle}>
            <IconButton aria-label='views' size='medium' className='space-x-1'>
                <LeaderboardOutlinedIcon fontSize='inherit' />
                <span className='text-xs'>{eVal}</span>
            </IconButton>
        </TooltipClick>
    );
}
