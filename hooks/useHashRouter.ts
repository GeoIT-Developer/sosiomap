import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useHashRouter = (): [string, (newHash: string) => void] => {
    const router = useRouter();
    const [hash, setHash] = useState('');

    useEffect(() => {
        setHash(window.location.hash);
    }, []);

    const setHashInUrl = (newHash: string) => {
        router.replace(
            `${window.location.pathname}${window.location.search}${newHash}`
        );
        setHash(newHash);
    };

    return [hash, setHashInUrl];
};

export default useHashRouter;
