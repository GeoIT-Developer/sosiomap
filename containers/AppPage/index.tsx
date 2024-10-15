'use client';

import Box from '@mui/material/Box';
import HomePage from '@/containers/HomePage';
import MainMap from '@/components/map/main';
import BottomNavBar, { LIST_ROUTE } from './BottomNavBar';
import BasemapProvider from '@/contexts/BasemapContext';
import { MapLibreProvider } from '@/contexts/MapLibreContext';
import { useEffect } from 'react';
import { useI18n } from '@/locales/client';
import dynamic from 'next/dynamic';
import { useWideScreenContext } from '@/contexts/ResponsiveContext';
import React from 'react';
import { ActiveTopicProvider } from './PageContext';
import { useHashRouterContext } from '@/contexts/HashRouterContext';
import { HomePageProvider } from '../HomePage/PageContext';
import PopupAppPage from './Popup';

const MenuPage = dynamic(() => import('@/containers/MenuPage'));
const ExplorePage = dynamic(() => import('@/containers/ExplorePage'));
const ChatPage = dynamic(() => import('@/containers/ChatPage'));
const ProfilePage = dynamic(() => import('@/containers/ProfilePage'));

export default function AppPage() {
    const t = useI18n();
    const isWide = useWideScreenContext();
    const { hashRouter } = useHashRouterContext();

    useEffect(() => {
        const title = t('app.name');
        switch (hashRouter) {
            case LIST_ROUTE.MENU:
                document.title = title + ' - ' + t('navigation.menu');
                break;
            case LIST_ROUTE.CHAT:
                document.title = title + ' - ' + t('navigation.chat');
                break;
            case LIST_ROUTE.EXPLORE:
                document.title = title + ' - ' + t('navigation.explore');
                break;
            case LIST_ROUTE.PROFILE:
                document.title = title + ' - ' + t('navigation.profile');
                break;

            default:
                document.title = title;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashRouter]);

    return (
        <ActiveTopicProvider>
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
                            <ExplorePage
                                show={hashRouter === LIST_ROUTE.EXPLORE}
                            />
                            <ChatPage show={hashRouter === LIST_ROUTE.CHAT} />
                            <ProfilePage
                                show={hashRouter === LIST_ROUTE.PROFILE}
                            />
                        </Box>

                        <Box flex='1'>
                            <BasemapProvider>
                                <MapLibreProvider>
                                    <MainMap className='!relative'>
                                        <HomePageProvider>
                                            <HomePage show />
                                        </HomePageProvider>
                                    </MainMap>

                                    <BottomNavBar />
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
                                    <HomePageProvider>
                                        <HomePage
                                            show={
                                                hashRouter === LIST_ROUTE.HOME
                                            }
                                        />
                                    </HomePageProvider>
                                </MainMap>

                                <BottomNavBar />
                            </MapLibreProvider>
                        </BasemapProvider>
                    </>
                )}
            </Box>
            <PopupAppPage />
        </ActiveTopicProvider>
    );
}
