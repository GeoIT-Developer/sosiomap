'use client';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import AppsIcon from '@mui/icons-material/Apps';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROUTE } from '@/utils/constant';
import { useScopedI18n } from '@/locales/client';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useEffect, useState } from 'react';
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import LoadingState from '@/types/loading-state.enum';
import { getDeviceOrientationOnce } from '@/hooks/useDeviceOrientation';
import useGeolocation from '@/hooks/useGeolocation';
import { toast } from 'react-toastify';
import { ObjectLiteral } from '@/types/object-literal.interface';

export const LIST_ROUTE = {
    HOME: ROUTE.HOME.MAP.URL,
    MENU: ROUTE.HOME.MENU.URL,
    EXPLORE: ROUTE.HOME.EXPLORE.URL,
    CHAT: ROUTE.HOME.CHAT.URL,
    PROFILE: ROUTE.HOME.PROFILE.URL,
};

enum LocationStatusEnum {
    IDLE = 'idle',
    FIXED = 'fixed',
    NAVIGATING = 'navigating',
}

let locationStatusPrevValue = LocationStatusEnum.IDLE;

export default function BottomNavBar({
    hashRouter,
    setHashRouter,
}: {
    hashRouter: string;
    setHashRouter: Function;
}) {
    const t = useScopedI18n('navigation');
    const [locationStatus, setLocationStatus] = useState<LocationStatusEnum>(
        LocationStatusEnum.IDLE,
    );
    const { myMap, mapStatus, geoControl } = useMapLibreContext();
    const geoLocation = useGeolocation();

    useEffect(() => {
        const handleOnDrag = () => {
            if (locationStatusPrevValue !== LocationStatusEnum.IDLE) {
                setLocationStatus(LocationStatusEnum.IDLE);
            }
        };

        if (myMap && mapStatus === LoadingState.SUCCESS) {
            myMap.on('dragstart', handleOnDrag);
        }
        return () => {
            if (myMap) {
                myMap.off('dragstart', handleOnDrag);
            }
        };
    }, [mapStatus, myMap]);

    function onChangePage(route: string) {
        if (hashRouter !== route) {
            setHashRouter(route);
            setLocationStatus(LocationStatusEnum.IDLE);
        }
    }

    function onMainButtonClicked() {
        if (hashRouter === LIST_ROUTE.HOME) {
            if (locationStatus === LocationStatusEnum.NAVIGATING) {
                setLocationStatus(LocationStatusEnum.FIXED);
                if (myMap) {
                    myMap.flyTo({
                        bearing: 0,
                        speed: 1.5,
                        curve: 1,
                        pitch: 0,
                    });
                }
            } else if (locationStatus === LocationStatusEnum.FIXED) {
                setLocationStatus(LocationStatusEnum.NAVIGATING);
                if (myMap) {
                    getDeviceOrientationOnce()
                        .then((orientationData) => {
                            myMap.flyTo({
                                zoom: 16,
                                bearing: orientationData.alpha || 0,
                                speed: 1.5,
                                curve: 1,
                                pitch: 60,
                            });
                        })
                        .catch(() => {
                            myMap.flyTo({
                                zoom: 16,
                                bearing: 90,
                                speed: 1.5,
                                curve: 1,
                                pitch: 45,
                            });
                        });
                }
            } else {
                geoLocation.requestGeolocation();
                geoControl.trigger();
                setLocationStatus(LocationStatusEnum.FIXED);
            }
        } else {
            onChangePage(LIST_ROUTE.HOME);
        }
    }

    useEffect(() => {
        if (
            geoLocation.error &&
            !geoLocation.loading &&
            locationStatus === LocationStatusEnum.FIXED
        ) {
            toast.error(geoLocation.error, {
                type: 'error',
                theme: 'colored',
            });
        }
    }, [geoLocation.error, geoLocation.loading, locationStatus]);

    const MainButton = (fabProps: ObjectLiteral) => {
        // Did this to remove warning
        const { showLabel, ...restProps } = fabProps;
        return (
            <Fab
                {...restProps}
                color={hashRouter === LIST_ROUTE.HOME ? 'primary' : undefined}
                size='small'
                aria-label={t('home')}
                onClick={onMainButtonClicked}
            >
                {locationStatus === 'idle' && <NavigationIcon />}
                {locationStatus === 'fixed' && <MyLocationIcon />}
                {locationStatus === 'navigating' && <CompassCalibrationIcon />}
            </Fab>
        );
    };

    locationStatusPrevValue = locationStatus;
    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
            elevation={5}
        >
            <BottomNavigation
                showLabels={false}
                value={hashRouter}
                onChange={(_event, eVal) => {
                    onChangePage(eVal);
                }}
            >
                <BottomNavigationAction
                    label={t('menu')}
                    icon={<AppsIcon />}
                    value={LIST_ROUTE.MENU}
                />
                <BottomNavigationAction
                    label={t('explore')}
                    icon={<TravelExploreIcon />}
                    value={LIST_ROUTE.EXPLORE}
                />
                <MainButton />
                <BottomNavigationAction
                    label={t('chat')}
                    icon={<ChatIcon />}
                    value={LIST_ROUTE.CHAT}
                />
                <BottomNavigationAction
                    label={t('profile')}
                    icon={<AccountCircleIcon />}
                    value={LIST_ROUTE.PROFILE}
                />
            </BottomNavigation>
        </Paper>
    );
}
