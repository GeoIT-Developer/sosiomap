import { useHistoryContext } from '@/contexts/HistoryContext';
import { useRouter } from 'next/navigation';

type QueryParams = Record<string, string>;

function useQueryParams() {
    const history = useHistoryContext();
    const router = useRouter();

    const setQueryParams = (params: QueryParams) => {
        const newParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            newParams.set(key, value);
        });
        router.push(
            `${window.location.pathname}?${newParams.toString()}${
                window.location.hash
            }`,
        );
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
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete(key);
        setQueryParams(Object.fromEntries(queryParams));
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
    };
}

export default useQueryParams;
