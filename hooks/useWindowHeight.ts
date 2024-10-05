import { useState, useEffect } from 'react';
import DisplaySize from '@/types/display-size.enum';
import { useResponsiveContext } from '@/contexts/ResponsiveContext';

const useWindowHeight = () => {
    const [height, setHeight] = useState(0);
    const responsive = useResponsiveContext();

    const handleResize = () => {
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        setHeight(window.innerHeight);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const heightString = height === 0 ? '100vh' : height + 'px';
    const heightStyle = `calc(${heightString} - 56px)`;
    const heightStyleAppBar = `calc(${heightString} - ${
        responsive && responsive >= DisplaySize.Tablet ? '64px' : '56px'
    })`;
    const fragmentHeightStyle = `calc(${heightString} - 56px - ${
        responsive && responsive >= DisplaySize.Tablet ? '64px' : '56px'
    })`;

    return { height, heightStyle, fragmentHeightStyle, heightStyleAppBar };
};

export default useWindowHeight;
