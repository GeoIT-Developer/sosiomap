import { Fade } from '@mui/material';
import { useEffect } from 'react';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import MainFab from '@/components/button/MainFab';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Slider from 'react-slick';
import SimplePost from '../Post/View/SimplePost';
import { useWideScreenContext } from '@/contexts/ResponsiveContext';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import {
    hideSelectedPoint,
    showSelectedPoint,
} from '@/components/map/hooks/useMapSelected';
import { useHomePageContext } from './PageContext';

function SliderArrow(props: any) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{
                ...style,
                background: '#333',
                borderRadius: '16px',
                height: '10rem',
                paddingTop: '4.5rem',
            }}
            onClick={onClick}
        />
    );
}

export default function SelectedCard() {
    const { myMap } = useMapLibreContext();
    const isWide = useWideScreenContext();
    const { showCardSlider, setShowCardSlider, listScanData, locationStorage } =
        useHomePageContext();

    function handlePostScan(post: MapPostDataInterface) {
        if (!myMap) return;
        if (!post) return;
        const lon = post.location.coordinates[0];
        const lat = post.location.coordinates[1];
        myMap.flyTo({
            center: [lon, lat],
            essential: true,
            speed: 0.85,
        });
        showSelectedPoint(myMap, lon, lat);
    }

    function onSwipeSlider(_currentSlide: number, nextSlide: number) {
        if (!myMap) return;
        const post = listScanData[nextSlide];
        handlePostScan(post);
    }

    useEffect(() => {
        if (showCardSlider === false) {
            hideSelectedPoint(myMap);
        }
    }, [showCardSlider]);

    return (
        <Fade in={showCardSlider} mountOnEnter unmountOnExit>
            <div className='w-full absolute bottom-0 z-[3]'>
                <div className={`${isWide ? 'w-[90%]' : 'w-full'} mx-auto`}>
                    <MainFab
                        onClick={() => setShowCardSlider(false)}
                        color='error'
                        size='small'
                        sx={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                        }}
                    >
                        <KeyboardArrowDownIcon />
                    </MainFab>
                    <Slider
                        lazyLoad='ondemand'
                        infinite={isWide}
                        speed={500}
                        slidesToShow={isWide ? 2 : 1}
                        slidesToScroll={1}
                        adaptiveHeight
                        arrows={isWide}
                        centerMode={isWide}
                        className='center'
                        nextArrow={<SliderArrow />}
                        prevArrow={<SliderArrow />}
                        beforeChange={onSwipeSlider}
                    >
                        {listScanData.map((item) => {
                            return (
                                <div key={item._id} className='px-2'>
                                    <SimplePost
                                        post={item}
                                        userLocation={locationStorage.getItem()}
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </Fade>
    );
}
