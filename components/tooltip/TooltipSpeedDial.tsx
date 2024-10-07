import { Tooltip } from '@mui/material';
import { ReactElement } from 'react';
import React from 'react';

export default function TooltipSpeedDial({
    children,
    label,
}: {
    children: ReactElement;
    label: string;
}) {
    return (
        <Tooltip
            title={label}
            placement='left'
            arrow
            open
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 20],
                            },
                        },
                    ],
                },
            }}
            PopperProps={{
                sx: {
                    '& .MuiTooltip-tooltip': {
                        fontSize: '12px',
                    },
                    zIndex: 'auto',
                },
            }}
            style={{ zIndex: 'auto' }}
        >
            {children}
        </Tooltip>
    );
}
