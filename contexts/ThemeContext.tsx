'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import { ReactChildrenProps } from '@/types/react-children.props';
import { LOCAL_STORAGE } from '@/utils/constant';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { createContext, useContext, useMemo } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

type ThemeModeType = 'light' | 'dark';

const ColorModeContext = createContext<{
    toggleColorMode: () => void;
    mode: ThemeModeType;
}>({ toggleColorMode: () => {}, mode: 'dark' });

export default function ThemeContext({ children }: ReactChildrenProps) {
    const [mode, setMode] = useLocalStorage<ThemeModeType>(
        LOCAL_STORAGE.THEME,
        'dark',
    );

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [setMode],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#cc0004',
                    },
                    secondary: {
                        main: '#f5a200',
                    },
                },
                typography: {
                    fontFamily: 'ABeeZee',
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider
            value={{ toggleColorMode: colorMode.toggleColorMode, mode }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {children}
                </LocalizationProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ColorModeContext);
    return context;
}
