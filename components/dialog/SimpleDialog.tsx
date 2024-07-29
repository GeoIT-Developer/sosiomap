import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
    ReactElement,
    ReactNode,
    cloneElement,
    useEffect,
    useState,
} from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface SimpleDialogProps {
    children: ReactNode;
    title?: ReactNode;
    triggerButton?: ReactElement;
    keepMounted?: boolean | 'on-open';
}

export default function SimpleDialog({
    title,
    children,
    triggerButton = <Button variant='outlined'>Open</Button>,
    keepMounted: keepMountedSetting,
}: SimpleDialogProps) {
    const [open, setOpen] = useState(false);
    const [keepMounted, setKeepMounted] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const clonedButton = cloneElement(triggerButton, {
        onClick: () => setOpen(true),
    });

    useEffect(() => {
        if (keepMountedSetting === true) {
            setKeepMounted(true);
        } else if (keepMountedSetting === 'on-open' && open) {
            setKeepMounted(true);
        }
    }, [keepMountedSetting, open]);

    return (
        <>
            {clonedButton}
            <BootstrapDialog
                onClose={handleClose}
                open={open}
                keepMounted={keepMounted}
            >
                {title && (
                    <>
                        <DialogTitle>{title}</DialogTitle>
                        <IconButton
                            aria-label='close'
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </>
                )}
                {children}
            </BootstrapDialog>
        </>
    );
}
