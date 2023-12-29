import Menu from '@mui/material/Menu';
import { ReactElement, ReactNode, cloneElement, useState } from 'react';

type BasicMenuProps = {
    menuButton: ReactElement;
    menuID: string;
    children: ReactNode;
};

export default function BasicMenu({
    children,
    menuButton,
    menuID = '',
}: BasicMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const clonedButton = cloneElement(menuButton, {
        'aria-controls': open ? menuID + '-menu' : undefined,
        'aria-haspopup': 'true',
        'aria-expanded': open ? 'true' : undefined,
        onClick: handleClick,
        id: menuID + '-button',
    });

    return (
        <>
            {clonedButton}
            <Menu
                id={menuID + '-menu'}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': menuID + '-button',
                }}
            >
                {children}
            </Menu>
        </>
    );
}
