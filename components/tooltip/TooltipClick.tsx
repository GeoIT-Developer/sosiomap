import { ClickAwayListener, Tooltip } from '@mui/material';
import { cloneElement, ReactElement, ReactNode, useState } from 'react';

type Props = {
    title: ReactNode;
    children: ReactElement;
    placement?: 'top' | 'bottom' | 'right' | 'left';
};

export default function TooltipClick({
    title,
    children,
    placement = 'top',
}: Props) {
    const [openTooltip, setOpenTooltip] = useState(false);

    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };

    const clonedChildren = cloneElement(children, {
        onClick: (e: Event) => {
            e.stopPropagation();
            setOpenTooltip(true);
        },
    });
    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
                title={title}
                placement={placement}
                arrow
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openTooltip}
            >
                {clonedChildren}
            </Tooltip>
        </ClickAwayListener>
    );
}
