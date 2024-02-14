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
import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useContext } from 'react';
import { LOCAL_STORAGE } from '@/utils/constant';
import { TopicType, useActiveTopic, useMainTopic } from '@/hooks/useTopic';

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
    const [hashRouter, setHashRouter] = useHashRouter();
    const mainTopic = useMainTopic();
    const [activeTopic, setActiveTopic] = useLocalStorage(
        LOCAL_STORAGE.ACTIVE_TOPIC,
        mainTopic.map((item) => item.id),
    );
    const { activeTopic: activeTopicType, refreshTopic } = useActiveTopic();

    const isWide = useWideScreen();

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
