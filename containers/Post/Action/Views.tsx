import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import { useState } from 'react';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import useFormattingData from '@/hooks/useFormattingData';

type Props = {
    value: number;
};

export default function Views({ value }: Props) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const t = useScopedI18n('post.statistic');
    const { formattingData } = useFormattingData();

    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };

    const handleTooltipOpen = () => {
        setOpenTooltip(true);
    };

    const eVal = formattingData(value);
    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                // @ts-ignore
                title={t('views', { value: eVal })}
                placement='top'
                arrow
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openTooltip}
            >
                <IconButton
                    aria-label='views'
                    size='medium'
                    className='space-x-1'
                    onClick={handleTooltipOpen}
                >
                    <LeaderboardOutlinedIcon fontSize='inherit' />
                    <span className='text-xs'>{eVal}</span>
                </IconButton>
            </Tooltip>
        </ClickAwayListener>
    );
}
