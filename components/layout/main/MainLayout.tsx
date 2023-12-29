'use client';

import Box from '@mui/material/Box';
import { useScopedI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import MenuPage from '@/containers/MenuPage';
import ExplorePage from '@/containers/ExplorePage';
import HomePage from '@/containers/HomePage';
import ChatPage from '@/containers/ChatPage';
import ProfilePage from '@/containers/ProfilePage';
import MainMap from '@/components/map/main';
import useHashRouter from '@/hooks/useHashRouter';
import BottomNavBar, { LIST_ROUTE } from './BottomNavBar';
import { useEffect, useMemo, useState } from 'react';
import BasemapProvider from '@/contexts/BasemapContext';
import { MapLibreProvider } from '@/contexts/MapLibreContext';

export default function MainLayout() {
    const router = useRouter();
    const t = useScopedI18n('navigation');
    const [hashRouter, setHashRouter] = useHashRouter();

    // useEffect(() => {
    //     if (hashRouter === LIST_ROUTE.HOME) {
    //         window.scrollTo(0, 1);
    //     }
    // }, [hashRouter]);

    return (
        <Box sx={{ pb: 7 }}>
            <MenuPage show={hashRouter === LIST_ROUTE.MENU} />
            <ExplorePage show={hashRouter === LIST_ROUTE.EXPLORE} />
            <ChatPage show={hashRouter === LIST_ROUTE.CHAT} />
            <ProfilePage show={hashRouter === LIST_ROUTE.PROFILE} />

            <BasemapProvider>
                <MapLibreProvider>
                    <MainMap
                        className={
                            hashRouter !== LIST_ROUTE.HOME ? '-z-10' : ''
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
        </Box>
    );
}
