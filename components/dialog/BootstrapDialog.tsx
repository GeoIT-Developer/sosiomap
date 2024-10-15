import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ReactNode } from 'react';
import { Breakpoint, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogActions, DialogContent } from '@mui/material';

const BootstrapDialogStyle = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogTitle-root': {
        padding: theme.spacing(2),
    },
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
    maxWidth?: Breakpoint;
    action?: ReactNode;
    disableOutsideClick?: boolean;
}

export default function BootstrapDialog({
    title,
    children,
    open,
    handleClose,
    className = '',
    maxWidth = 'lg',
    action,
    disableOutsideClick,
}: BootstrapDialogProps) {
    return (
        <>
            <BootstrapDialogStyle
                onClose={disableOutsideClick ? undefined : handleClose}
                open={open}
                className={className}
                fullWidth
                maxWidth={maxWidth}
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
                {action && <DialogActions>{action}</DialogActions>}
            </BootstrapDialogStyle>
        </>
    );
}
