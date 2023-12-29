type LocalStorageValue<T> = T;

const useLocalStorageFunc = <T>(key: string, initialValue: T) => {
    const getItem = (): LocalStorageValue<T> => {
        const storedItem = localStorage.getItem(key);
        return storedItem ? (JSON.parse(storedItem) as T) : initialValue;
    };

    const setItem = (newValue: T): void => {
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return { getItem, setItem };
};

export default useLocalStorageFunc;
