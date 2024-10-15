import { useCallback, useEffect, useState } from 'react';

function useLocalStorageUn<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T | undefined>();

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setValue(JSON.parse(storedValue));
        } else {
            setValue(initialValue);
        }
    }, [key]);

    const setStoredValue = useCallback(
        (newValue: T | undefined | ((prevValue: T | undefined) => T)) => {
            setValue((prevValue) => {
                const finalValue =
                    typeof newValue === 'function'
                        ? (newValue as (prevValue: T | undefined) => T)(
                              prevValue,
                          )
                        : newValue;
                localStorage.setItem(key, JSON.stringify(finalValue));
                return finalValue;
            });
        },
        [key],
    );

    return [value, setStoredValue] as const;
}

export default useLocalStorageUn;
