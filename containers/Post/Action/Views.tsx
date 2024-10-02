import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import { useState } from 'react';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { formatDataCount } from '@/utils/helper';

type Props = {
    value: number;
};

export default function Views({ value }: Props) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const t = useScopedI18n('post.statistic');

    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };

    const handleTooltipOpen = () => {
        setOpenTooltip(true);
    };

    const tFormat = useScopedI18n('unit.number');
    function formattingData(count: number | undefined) {
        const eData = formatDataCount(count);
        return `${eData.count}${eData.label ? tFormat(eData.label) : ''}`;
    }
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
