import { useState, useEffect } from 'react';

const usePageLoaded = (show: boolean): boolean => {
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        if (show) {
            setPageLoaded(true);
        }
    }, [show]);

    return pageLoaded;
};

export default usePageLoaded;
