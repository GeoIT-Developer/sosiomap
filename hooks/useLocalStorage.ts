import { useCallback, useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setValue(JSON.parse(storedValue));
        }
    }, [key]);

    const setStoredValue = useCallback(
        (newValue: T | ((prevValue: T) => T)) => {
            setValue((prevValue) => {
                const finalValue =
                    typeof newValue === 'function'
                        ? (newValue as (prevValue: T) => T)(prevValue)
                        : newValue;
                localStorage.setItem(key, JSON.stringify(finalValue));
                return finalValue;
            });
        },
        [key],
    );

    return [value, setStoredValue] as const;
}

export default useLocalStorage;
