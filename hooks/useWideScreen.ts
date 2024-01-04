import { useState, useEffect } from 'react';
import useResponsive from './useResponsive';
import DisplaySize from '@/types/display-size.enum';

const useWideScreen = () => {
    const [isWide, setIsWide] = useState(false);
    const responsive = useResponsive();

    useEffect(() => {
        if (responsive >= DisplaySize.TabletL) {
            setIsWide(true);
        } else {
            setIsWide(false);
        }
    }, [responsive]);

    return isWide;
};

export default useWideScreen;
