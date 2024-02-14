import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContent } from '@mui/material';

const BootstrapDialogStyle = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface BootstrapDialogProps {
    children: ReactNode;
    title?: ReactNode;
    open: boolean;
    handleClose: () => void;
    className?: string;
}

export default function BootstrapDialog({
    title,
    children,
    open,
    handleClose,
    className = '',
}: BootstrapDialogProps) {
    return (
        <>
            <BootstrapDialogStyle
                onClose={handleClose}
                open={open}
                className={className}
                fullWidth
                maxWidth='lg'
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
                <DialogContent>{children}</DialogContent>
            </BootstrapDialogStyle>
        </>
    );
}
