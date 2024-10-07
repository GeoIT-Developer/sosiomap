import { getLngLat } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';

function useMapMarker() {
    const { myMap } = useMapLibreContext();
    const [showMarker, setShowMarker] = useState(false);
    const [center, setCenter] = useState({ lng: 0, lat: 0 });

    useEffect(() => {
        if (!showMarker) return;
        const mapMarker = document.getElementById('map_marker');
        setCenter(getLngLat(myMap?.getCenter()));

        const handleMoveStart = () => {
            if (mapMarker) {
                mapMarker.style.marginTop = '-48px';
            }
        };
        const handleMoveEnd = () => {
            if (mapMarker) {
                mapMarker.style.marginTop = '-32px';
                setCenter(getLngLat(myMap?.getCenter()));
            }
        };
        myMap?.on('movestart', handleMoveStart);
        myMap?.on('moveend', handleMoveEnd);

        return () => {
            if (myMap) {
                myMap.off('movestart', handleMoveStart);
                myMap.off('moveend', handleMoveEnd);
            }
        };
    }, [myMap, showMarker]);

    return { showMarker, setShowMarker, center, setCenter };
}

export default useMapMarker;
