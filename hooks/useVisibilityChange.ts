import { useCallback, useEffect } from 'react';

function useVisibilityChange(
    key: 'always' | string,
    onChange: () => void,
    timeout: number = 1500,
) {
    const onVisibilityChange = useCallback(() => {
        if (!document.hidden) {
            if (key === 'always') {
                setTimeout(() => {
                    onChange();
                }, timeout);
            } else {
                const isRefresh = localStorage.getItem(key);
                try {
                    if (isRefresh) {
                        if (JSON.parse(isRefresh) === true) {
                            setTimeout(() => {
                                localStorage.removeItem(key);
                                onChange();
                            }, timeout);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener('visibilitychange', onVisibilityChange);
        return () => {
            document.removeEventListener(
                'visibilitychange',
                onVisibilityChange,
            );
        };
    }, [onVisibilityChange]);
}

export default useVisibilityChange;
