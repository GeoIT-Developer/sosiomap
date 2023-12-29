import { useState } from 'react';

function useRefresh() {
    const [value, setValue] = useState(new Date().getTime());

    const setRefresh = () => {
        setValue(new Date().getTime());
    };

    return [value, setRefresh];
}

export default useRefresh;
