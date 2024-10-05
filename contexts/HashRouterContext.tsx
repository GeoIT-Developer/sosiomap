'use client';

import React, { createContext, useContext } from 'react';
import useHashRouter from '@/hooks/useHashRouter';
import { ReactChildrenProps } from '@/types/react-children.props';

interface HashRouterContextType {
    hashRouter: string;
    setHashRouter: (newHash: string) => void;
}

const HashRouterContext = createContext<HashRouterContextType | undefined>(
    undefined,
);

export default function HashRouterProvider({ children }: ReactChildrenProps) {
    const [hashRouter, setHashRouter] = useHashRouter();
    const value = { hashRouter, setHashRouter };

    return (
        <HashRouterContext.Provider value={value}>
            {children}
        </HashRouterContext.Provider>
    );
}

export const useHashRouterContext = (): HashRouterContextType => {
    const context = useContext(HashRouterContext);
    if (!context) {
        throw new Error(
            'useHashRouterContext must be used within a HashRouterContext',
        );
    }
    return context;
};
