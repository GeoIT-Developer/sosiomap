import { useState } from 'react';

function useRefresh(): [number, () => void] {
    const [value, setValue] = useState(Date.now());

    const setRefresh = () => {
        setValue(Date.now());
    };

    return [value, setRefresh];
}

export default useRefresh;
