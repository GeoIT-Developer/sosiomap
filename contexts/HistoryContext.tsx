'use client';

import { ReactChildrenProps } from '@/types/react-children.props';
import { getLastElement } from '@/utils';
import { ROUTE } from '@/utils/constant';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useState, useEffect, useContext } from 'react';

interface HValidation {
    history: string[];
    setHistory(data: string[]): void;
    onBackClose(_args?: string): void;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

export default function HistoryProvider({ children }: ReactChildrenProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [history, setHistory] = useState<string[]>([]);

    function onBackClose(eURL = ROUTE.HOME.URL) {
        const eHistory = history.slice(0, -1);
        if (getLastElement(eHistory) === eURL) {
            router.back();
        } else {
            router.push(eURL);
        }
    }

    useEffect(() => {
        setHistory((previous) => [...previous, pathname]);
    }, [pathname, searchParams]);

    return (
        <HistoryContext.Provider
            value={{
                onBackClose,
                history,
                setHistory,
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
