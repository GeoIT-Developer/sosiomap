import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ReactElement, ReactNode, cloneElement, useState } from 'react';

interface SimpleDialogProps {
    children: ReactNode;
    title?: ReactNode;
    triggerButton?: ReactElement;
}

export default function SimpleDialog({
    title,
    children,
    triggerButton = <Button variant='outlined'>Open</Button>,
}: SimpleDialogProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const clonedButton = cloneElement(triggerButton, {
        onClick: () => setOpen(true),
    });

    return (
        <>
            {clonedButton}
            <Dialog onClose={handleClose} open={open}>
                {title && <DialogTitle>{title}</DialogTitle>}
                {children}
            </Dialog>
        </>
    );
}
