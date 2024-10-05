import { Fab, Zoom } from '@mui/material';
import { useI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import SensorsIcon from '@mui/icons-material/Sensors';
import { myTurf } from '@/utils/helper';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import { toast } from 'react-toastify';
import { TooltipSpeedDial } from './HomeSpeedDial';
import React from 'react';

type Props = {
    posts: MapPostDataInterface[];
    onChangeListScan: (show: boolean, list: MapPostDataInterface[]) => void;
};

export default function ScanButton({ posts, onChangeListScan }: Props) {
    const t = useI18n();
    const { myMap } = useMapLibreContext();

    function onClickScan() {
        if (!myMap) return;
        const bbox = myMap.getBounds();
        const polygonCoordinates = [
            [
                [bbox._sw.lng, bbox._sw.lat],
                [bbox._sw.lng, bbox._ne.lat],
                [bbox._ne.lng, bbox._ne.lat],
                [bbox._ne.lng, bbox._sw.lat],
                [bbox._sw.lng, bbox._sw.lat],
            ],
        ];
        const polygon = myTurf.polygon(polygonCoordinates);
        const filteredData = posts.filter((item) => {
            const point = myTurf.point(item.location.coordinates);
            return myTurf.booleanPointInPolygon(point, polygon);
        });

        if (filteredData.length > 0) {
            onChangeListScan(true, filteredData);
        } else {
            onChangeListScan(false, []);
            toast.info(t('message.error.no_post_found_in_your_area'), {
                theme: 'colored',
            });
        }
    }

    return (
        <Zoom in>
            <Fab aria-label='scan' size='medium' onClick={onClickScan}>
                <TooltipSpeedDial label={t('button.scan_this_area')}>
                    <SensorsIcon />
                </TooltipSpeedDial>
            </Fab>
        </Zoom>
    );
}
