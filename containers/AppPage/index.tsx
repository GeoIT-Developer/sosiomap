'use client';

import Box from '@mui/material/Box';
import MenuPage from '@/containers/MenuPage';
import ExplorePage from '@/containers/ExplorePage';
import HomePage from '@/containers/HomePage';
import ChatPage from '@/containers/ChatPage';
import ProfilePage from '@/containers/ProfilePage';
import MainMap from '@/components/map/main';
import useHashRouter from '@/hooks/useHashRouter';
import BottomNavBar, { LIST_ROUTE } from './BottomNavBar';
import BasemapProvider from '@/contexts/BasemapContext';
import { MapLibreProvider } from '@/contexts/MapLibreContext';
import useWideScreen from '@/hooks/useWideScreen';

export default function AppPage() {
    const [hashRouter, setHashRouter] = useHashRouter();

    const isWide = useWideScreen();

    return (
        <Box sx={{ pb: 7 }}>
            {isWide === true && (
                <Box display='flex'>
                    <Box width='365px'>
                        <MenuPage
                            show={
                                hashRouter === LIST_ROUTE.MENU ||
                                hashRouter === LIST_ROUTE.HOME
                            }
                        />
                        <ExplorePage show={hashRouter === LIST_ROUTE.EXPLORE} />
                        <ChatPage show={hashRouter === LIST_ROUTE.CHAT} />
                        <ProfilePage show={hashRouter === LIST_ROUTE.PROFILE} />
                    </Box>

                    <Box flex='1'>
                        <BasemapProvider>
                            <MapLibreProvider>
                                <MainMap className='!relative'>
                                    <HomePage />
                                </MainMap>

                                <BottomNavBar
                                    hashRouter={hashRouter}
                                    setHashRouter={setHashRouter}
                                />
                            </MapLibreProvider>
                        </BasemapProvider>
                    </Box>
                </Box>
            )}

            {isWide === false && (
                <>
                    <MenuPage show={hashRouter === LIST_ROUTE.MENU} />
                    <ExplorePage show={hashRouter === LIST_ROUTE.EXPLORE} />
                    <ChatPage show={hashRouter === LIST_ROUTE.CHAT} />
                    <ProfilePage show={hashRouter === LIST_ROUTE.PROFILE} />

                    <BasemapProvider>
                        <MapLibreProvider>
                            <MainMap
                                className={
                                    hashRouter !== LIST_ROUTE.HOME
                                        ? '-z-10'
                                        : ''
                                }
                            >
                                <HomePage />
                            </MainMap>

                            <BottomNavBar
                                hashRouter={hashRouter}
                                setHashRouter={setHashRouter}
                            />
                        </MapLibreProvider>
                    </BasemapProvider>
                </>
            )}
        </Box>
    );
}
