import { Button, Typography } from '@mui/material';
import MyImage from '@/components/preview/MyImage';
import { ASSETS, QUERY, ROUTE } from '@/utils/constant';
import React from 'react';
import { useI18n } from '@/locales/client';
import ChooseLocationEnum from '@/types/choose-location.enum';
import { useHomePageContext } from './PageContext';

export default function Marker() {
    const t = useI18n();
    const { center, selectedTopic, setShowMarker } = useHomePageContext();

    function onClickOKMarker() {
        setShowMarker(false);

        const newParams = new URLSearchParams();
        newParams.set(QUERY.LOCATION, ChooseLocationEnum.CHOOSE_ON_MAP);
        newParams.set(QUERY.LON, String(center.lng));
        newParams.set(QUERY.LAT, String(center.lat));
        newParams.set(QUERY.TOPIC, selectedTopic?.id || '');

        const theURL = `${ROUTE.POST.NEW.URL}?${newParams.toString()}`;
        window.open(theURL, '_blank');
    }

    return (
        <>
            <div className='absolute top-1/2 left-1/2 z-10 w-1 h-1 bg-red-700 rounded-sm m-[-0.1rem]'></div>
            <MyImage
                id='map_marker'
                src={ASSETS.MARKER + 'blue_marker.svg'}
                alt='Marker'
                width={24}
                className='absolute top-1/2 left-1/2 z-10 mt-[-32px] ml-[-11px]'
            />
            <div
                className='absolute top-[calc(50%-8rem)] left-1/2 z-10 bg-white text-center p-2 rounded-md opacity-75 backdrop-blur-lg'
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                <Typography variant='body2' className='text-black py-2'>
                    {JSON.stringify(center, undefined, 2)}
                </Typography>
                <div className='flex space-x-4'>
                    <Button
                        className='w-full'
                        size='small'
                        variant='outlined'
                        onClick={() => setShowMarker(false)}
                    >
                        {t('button.cancel')}
                    </Button>
                    <Button
                        className='w-full'
                        size='small'
                        variant='contained'
                        onClick={onClickOKMarker}
                    >
                        {t('button.ok')}
                    </Button>
                </div>
            </div>
        </>
    );
}
