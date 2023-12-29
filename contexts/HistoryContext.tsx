'use client';

import { ReactChildrenProps } from '@/types/react-children.props';
import { getLastElement } from '@/utils';
import { ROUTE } from '@/utils/constant';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useState, useEffect, useContext } from 'react';

interface HValidation {
    history: string[];
    setHistory(data: string[]): void;
    onBackClose(): void;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

export default function HistoryProvider({ children }: ReactChildrenProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [history, setHistory] = useState<string[]>([]);

    function onBackClose() {
        if (getLastElement(history) === ROUTE.HOME.URL) {
            router.back();
        } else {
            router.push(ROUTE.HOME.URL);
        }
    }

    useEffect(() => {
        setHistory((previous) => [...previous, pathname]);
    }, [pathname]);

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

export function useHistory(): HValidation {
    const context = useContext(HistoryContext);
    return context;
}
