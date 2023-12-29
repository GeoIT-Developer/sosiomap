import DisplaySize from '@/types/display-size.enum';
import { useEffect, useMemo, useState } from 'react';

const determineDisplaySize = (width: number) => {
    if (width >= DisplaySize.Tablet) {
        if (width >= DisplaySize.ComputerM) {
            if (width >= DisplaySize.ComputerL) {
                return DisplaySize.ComputerL;
            } else {
                return DisplaySize.ComputerM;
            }
        } else if (width >= DisplaySize.ComputerS) {
            return DisplaySize.ComputerS;
        } else if (width >= DisplaySize.TabletL) {
            return DisplaySize.TabletL;
        } else {
            return DisplaySize.Tablet;
        }
    } else if (width >= DisplaySize.MobileM) {
        if (width >= DisplaySize.MobileL) {
            return DisplaySize.MobileL;
        } else {
            return DisplaySize.MobileM;
        }
    } else if (width >= DisplaySize.MobileS) {
        return DisplaySize.MobileS;
    } else {
        return DisplaySize.NotSupported;
    }
};

const useResponsive = () => {
    const [currentDisplaySize, setCurrentDisplaySize] = useState(
        determineDisplaySize(DisplaySize.MobileL)
    );

    useEffect(() => {
        const handler = () =>
            setCurrentDisplaySize(determineDisplaySize(window.innerWidth));
        setTimeout(() => {
            handler();
        }, 100);

        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return useMemo(() => currentDisplaySize, [currentDisplaySize]);
};

export default useResponsive;
