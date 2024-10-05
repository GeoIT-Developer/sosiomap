'use client';

import DisplaySize from '@/types/display-size.enum';
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
    ReactNode,
} from 'react';

interface ResponsiveContextProps {
    currentDisplaySize: number | undefined;
    isWide: boolean | undefined;
}

const ResponsiveContext = createContext<ResponsiveContextProps | undefined>(
    undefined,
);

const determineDisplaySize = (width: number) => {
    if (width >= DisplaySize.Tablet) {
        if (width >= DisplaySize.ComputerM) {
            if (width >= DisplaySize.ComputerL) {
                return DisplaySize.ComputerL;
            } else {
                return DisplaySize.ComputerM;
            }
        } else if (width >= DisplaySize.ComputerS) {
            return DisplaySize.ComputerS;
        } else if (width >= DisplaySize.TabletL) {
            return DisplaySize.TabletL;
        } else {
            return DisplaySize.Tablet;
        }
    } else if (width >= DisplaySize.MobileM) {
        if (width >= DisplaySize.MobileL) {
            return DisplaySize.MobileL;
        } else {
            return DisplaySize.MobileM;
        }
    } else if (width >= DisplaySize.MobileS) {
        return DisplaySize.MobileS;
    } else {
        return DisplaySize.NotSupported;
    }
};

export default function ResponsiveProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [currentDisplaySize, setCurrentDisplaySize] = useState<
        number | undefined
    >();
    const [isWide, setIsWide] = useState<boolean | undefined>();

    useEffect(() => {
        const handler = () => {
            const newSize = determineDisplaySize(window.innerWidth);
            setCurrentDisplaySize(newSize);
            setIsWide(newSize >= DisplaySize.TabletL); // Example logic for "wide" screen
        };

        handler(); // Initialize on first render
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const value = useMemo(
        () => ({
            currentDisplaySize,
            isWide,
        }),
        [currentDisplaySize, isWide],
    );

    return (
        <ResponsiveContext.Provider value={value}>
            {children}
        </ResponsiveContext.Provider>
    );
}

export const useResponsiveContext = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error(
            'useResponsiveContext must be used within a ResponsiveProvider',
        );
    }
    return context.currentDisplaySize;
};

export const useWideScreenContext = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error(
            'useWideScreenContext must be used within a ResponsiveProvider',
        );
    }
    return context.isWide;
};
