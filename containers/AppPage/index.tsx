'use client';

import Box from '@mui/material/Box';
import HomePage from '@/containers/HomePage';
import MainMap from '@/components/map/main';
import useHashRouter from '@/hooks/useHashRouter';
import BottomNavBar, { LIST_ROUTE } from './BottomNavBar';
import BasemapProvider from '@/contexts/BasemapContext';
import { MapLibreProvider } from '@/contexts/MapLibreContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useContext, useEffect } from 'react';
import { LOCAL_STORAGE } from '@/utils/constant';
import { TopicType, useActiveTopic, useMainTopic } from '@/hooks/useTopic';
import { useI18n } from '@/locales/client';
import dynamic from 'next/dynamic';
import { useWideScreenContext } from '@/contexts/ResponsiveContext';
import React from 'react';

const MenuPage = dynamic(() => import('@/containers/MenuPage'));
const ExplorePage = dynamic(() => import('@/containers/ExplorePage'));
const ChatPage = dynamic(() => import('@/containers/ChatPage'));
const ProfilePage = dynamic(() => import('@/containers/ProfilePage'));

const ActiveTopicContext = createContext<{
    setActiveTopic: (
        newValue: string[] | ((prevValue: string[]) => string[]),
    ) => void;
    activeTopic: string[];
    activeTopicType: TopicType[];
    refreshTopic: () => void;
}>({
    setActiveTopic: () => {},
    activeTopic: [],
    activeTopicType: [],
    refreshTopic: () => {},
});

export function useActiveTopicContext() {
    const context = useContext(ActiveTopicContext);
    return context;
}

export default function AppPage() {
    const t = useI18n();
    const [hashRouter, setHashRouter] = useHashRouter();
    const mainTopic = useMainTopic();
    const [activeTopic, setActiveTopic] = useLocalStorage(
        LOCAL_STORAGE.ACTIVE_TOPIC,
        mainTopic.map((item) => item.id),
    );
    const { activeTopic: activeTopicType, refreshTopic } = useActiveTopic();

    const isWide = useWideScreenContext();

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
        <ActiveTopicContext.Provider
            value={{
                activeTopic,
                setActiveTopic,
                activeTopicType,
                refreshTopic,
            }}
        >
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
                                        <HomePage show />
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
                                    <HomePage
                                        show={hashRouter === LIST_ROUTE.HOME}
                                    />
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
        </ActiveTopicContext.Provider>
    );
}
