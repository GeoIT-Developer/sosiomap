'use client';

import React, { createContext, useContext } from 'react';
import { TopicType, useActiveTopic, useMainTopic } from '@/hooks/useTopic';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE } from '@/utils/constant';

// ================================ Active Topic ================================================

type ActiveTopicType = {
    setActiveTopic: (
        newValue: string[] | ((prevValue: string[]) => string[]),
    ) => void;
    activeTopic: string[];
    activeTopicType: TopicType[];
    refreshTopic: () => void;
};

const ActiveTopicContext = createContext<ActiveTopicType>({
    setActiveTopic: () => {},
    activeTopic: [],
    activeTopicType: [],
    refreshTopic: () => {},
});

export const ActiveTopicProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const mainTopic = useMainTopic();
    const [activeTopic, setActiveTopic] = useLocalStorage(
        LOCAL_STORAGE.ACTIVE_TOPIC,
        mainTopic.map((item) => item.id),
    );
    const { activeTopic: activeTopicType, refreshTopic } = useActiveTopic();

    return (
        <ActiveTopicContext.Provider
            value={{
                activeTopic,
                setActiveTopic,
                activeTopicType,
                refreshTopic,
            }}
        >
            {children}
        </ActiveTopicContext.Provider>
    );
};

export function useActiveTopicContext() {
    const context = useContext(ActiveTopicContext);
    if (!context) {
        throw new Error(
            'useActiveTopicContext must be used within a ActiveTopicContext',
        );
    }
    return context;
}
