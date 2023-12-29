'use client';

import { ReactChildrenProps } from '@/types/react-children.props';
import { IconButton } from '@mui/material';
import React, {
    ReactNode,
    createContext,
    forwardRef,
    useContext,
    useState,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
    },
);

interface SettingState {
    duration?: number;
    message?: ReactNode;
    type?: AlertColor;
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
}

const SnackbarContext = createContext<{
    toastOpen: (message: ReactNode) => void;
    setOptions: (_args?: SettingState) => void;
}>({
    toastOpen: (_args: ReactNode) => {},
    setOptions: (_args?: SettingState) => {},
});

const INITIAL_SETTING: SettingState = {
    vertical: 'top',
    horizontal: 'center',
    duration: 2500,
    message: '',
};

export default function SnackbarProvider({ children }: ReactChildrenProps) {
    const [setting, setSetting] = useState<SettingState>(INITIAL_SETTING);

    const [open, setOpen] = useState(false);

    const toastOpen = (msg: ReactNode) => {
        if (msg) {
            setSetting((oldState) => ({ ...oldState, message: msg }));
        }
        setOpen(true);
    };

    const setOptions = (options?: SettingState) => {
        if (options) {
            setSetting((oldState) => ({ ...oldState, ...options }));
        }
    };

    const toastClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ toastOpen, setOptions }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={setting.duration}
                onClose={toastClose}
                message={!setting.type && setting.message}
                action={
                    <IconButton
                        size='small'
                        aria-label='close'
                        color='inherit'
                        onClick={toastClose}
                    >
                        <CloseIcon fontSize='small' />
                    </IconButton>
                }
                anchorOrigin={{
                    vertical: setting.vertical || 'top',
                    horizontal: setting.horizontal || 'center',
                }}
            >
                {setting.type && (
                    <Alert severity={setting.type} onClose={toastClose}>
                        {setting.message}
                    </Alert>
                )}
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export function useSnackbar(initialValue?: SettingState) {
    const { toastOpen, setOptions } = useContext(SnackbarContext);

    const open = (message?: ReactNode, options?: SettingState) => {
        console.log('II', initialValue, options);
        setOptions({
            ...INITIAL_SETTING,
            type: undefined,
            ...initialValue,
            ...options,
        });
        toastOpen(message);
    };

    return { open, setOptions };
}
