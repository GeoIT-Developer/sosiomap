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
import useQueryParams from '@/hooks/useQueryParams';
import { POPUP_PARAMS } from '@/utils/constant';

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
    keepMounted?: boolean | 'on-first-open';
}

export default function SimpleDialog({
    title,
    children,
    triggerButton = <Button variant='outlined'>Open</Button>,
    keepMounted: keepMountedSetting,
}: SimpleDialogProps) {
    const queryParams = useQueryParams();
    const [open, setOpen] = useState(false);
    const [keepMounted, setKeepMounted] = useState(false);

    const handleClose = () => {
        setOpen(false);
        // Remove params when close popup
        queryParams.removeParam(POPUP_PARAMS.DIALOG.KEY);
    };

    const clonedButton = cloneElement(triggerButton, {
        onClick: () => setOpen(true),
    });

    useEffect(() => {
        if (keepMountedSetting === true) {
            setKeepMounted(true);
        } else if (keepMountedSetting === 'on-first-open' && open) {
            setKeepMounted(true);
        }
    }, [keepMountedSetting, open]);

    // Add params when open
    useEffect(() => {
        if (open) {
            queryParams.addParam(
                POPUP_PARAMS.DIALOG.KEY,
                POPUP_PARAMS.DIALOG.VALUE,
            );
        }
    }, [open]);

    // Close the popup when back using navigation
    useEffect(() => {
        if (!open) return;
        const popupParamsValue = queryParams.searchParams.get(
            POPUP_PARAMS.DIALOG.KEY,
        );
        if (popupParamsValue !== POPUP_PARAMS.DIALOG.VALUE) {
            setOpen(false);
        }
    }, [queryParams.searchParams]);

    return (
        <>
            {clonedButton}
            <BootstrapDialog
                onClose={handleClose}
                open={open}
                keepMounted={keepMounted}
                className={open ? '' : 'hidden pointer-events-none'}
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
