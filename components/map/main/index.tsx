import { ReactNode } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import useWindowHeight from '@/hooks/useWindowHeight';
import LoadingState from '@/types/loading-state.enum';
import { CircularProgress } from '@mui/material';
import { useMapLibreContext } from '@/contexts/MapLibreContext';

export default function MainMap({
    children,
    isLoading,
    className = '',
}: {
    children?: ReactNode;
    isLoading?: boolean;
    className?: string;
}) {
    const { mapContainer, mapStatus } = useMapLibreContext();

    const { heightStyle } = useWindowHeight();

    return (
        <div
            className={`absolute top-0 left-0 w-full h-screen ${className}`}
            style={{ height: heightStyle }}
        >
            {mapStatus !== LoadingState.UNDEFINED && children}
            {(mapStatus === LoadingState.LOADING || isLoading) && (
                <CircularProgress
                    color='secondary'
                    className='absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2'
                />
            )}

            <div ref={mapContainer} className={`w-full h-full`} />
        </div>
    );
}
