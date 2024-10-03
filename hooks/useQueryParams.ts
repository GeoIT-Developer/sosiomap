import { useHistoryContext } from '@/contexts/HistoryContext';
import { useRouter, useSearchParams } from 'next/navigation';
import useWideScreen from './useWideScreen';

type QueryParams = Record<string, string>;

function getCurrentPath(params: QueryParams) {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value);
    });

    const { pathname, hash } = window.location;
    return `${pathname}?${newParams.toString()}${hash}`;
}

function useQueryParams() {
    const searchParams = useSearchParams();
    const history = useHistoryContext();
    const router = useRouter();
    const isWide = useWideScreen();

    const setQueryParams = (params: QueryParams) => {
        if (isWide) return;
        const currentPath = getCurrentPath(params);
        router.push(currentPath);
    };

    const addParam = (key: string, value: string) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(key, value);
        setQueryParams(Object.fromEntries(queryParams));
    };

    const replaceParam = (key: string, value: string) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set(key, value);
        setQueryParams(Object.fromEntries(queryParams));
    };

    const removeParam = (key: string) => {
        if (isWide) return;
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete(key);

        const currentPath = getCurrentPath(Object.fromEntries(queryParams));
        history.onBackFullPath(currentPath);
    };

    const clearParams = () => {
        history.onBackClose();
    };

    return {
        setQueryParams,
        addParam,
        replaceParam,
        removeParam,
        clearParams,
        searchParams,
    };
}

export default useQueryParams;
