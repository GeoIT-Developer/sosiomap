import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
    cloneElement,
    forwardRef,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import { POPUP_PARAMS } from '@/utils/constant';
import { DialogContent, SxProps, Theme } from '@mui/material';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

interface Props {
    children: ReactNode;
    title: ReactNode;
    triggerButton?: ReactElement;
    action?: (handleClose: () => void) => ReactNode;
    keepMounted?: boolean | 'on-first-open';
    sx?: SxProps<Theme>;
}

export default function FullScreenDialog({
    title,
    children,
    triggerButton = <Button variant='outlined'>Open</Button>,
    keepMounted: keepMountedSetting,
    action,
    sx,
}: Props) {
    const queryParams = useQueryParams();
    const [open, setOpen] = useState(false);
    const [keepMounted, setKeepMounted] = useState(false);

    const handleClose = () => {
        setOpen(false);
        // Remove params when close popup
        queryParams.removeParam(POPUP_PARAMS.FULL_SCRREN_DIALOG.KEY);
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
                POPUP_PARAMS.FULL_SCRREN_DIALOG.KEY,
                POPUP_PARAMS.FULL_SCRREN_DIALOG.VALUE,
            );
        }
    }, [open]);

    // Close the popup when back using navigation
    useEffect(() => {
        if (!open) return;
        const popupParamsValue = queryParams.searchParams.get(
            POPUP_PARAMS.FULL_SCRREN_DIALOG.KEY,
        );
        if (popupParamsValue !== POPUP_PARAMS.FULL_SCRREN_DIALOG.VALUE) {
            setOpen(false);
        }
    }, [queryParams.searchParams]);

    return (
        <>
            {clonedButton}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted={keepMounted}
                className={open ? '' : 'hidden pointer-events-none'}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant='h6'
                            component='div'
                        >
                            {title}
                        </Typography>
                        {action && action(handleClose)}
                    </Toolbar>
                </AppBar>
                <DialogContent dividers={true} sx={sx}>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
