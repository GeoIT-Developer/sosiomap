'use client';

import { ReactChildrenProps } from '@/types/react-children.props';
import { getLastElement } from '@/utils';
import { ROUTE } from '@/utils/constant';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useState, useEffect, useContext } from 'react';

interface HValidation {
    history: string[];
    historyFullPath: string[];
    setHistory(data: string[]): void;
    onBackClose(_args?: string): void;
    onBackFullPath(_args?: string): void;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

export default function HistoryProvider({ children }: ReactChildrenProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [history, setHistory] = useState<string[]>([]);
    const [historyFullPath, setHistoryFullPath] = useState<string[]>([]);

    function onBackClose(eURL = ROUTE.HOME.URL) {
        const eHistory = history.slice(0, -1);
        if (getLastElement(eHistory) === eURL) {
            router.back();
        } else {
            router.push(eURL);
        }
    }

    function onBackFullPath(eURL = ROUTE.HOME.URL) {
        const eHistory = historyFullPath.slice(0, -1);
        if (getLastElement(eHistory) === eURL) {
            router.back();
        } else {
            router.push(eURL);
        }
    }

    useEffect(() => {
        const { hash } = window.location;
        const fullPath = `${pathname}?${searchParams.toString()}${hash}`;

        setHistory((previous) => [...previous, pathname]);
        setHistoryFullPath((previous) => [...previous, fullPath]);
    }, [pathname, searchParams]);

    return (
        <HistoryContext.Provider
            value={{
                onBackClose,
                history,
                setHistory,
                historyFullPath,
                onBackFullPath,
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistoryContext(): HValidation {
    const context = useContext(HistoryContext);
    return context;
}
