'use client';

import { useCommonDrawer } from '@/components/drawer/CommonDrawer';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    MutableRefObject,
} from 'react';

// Define types for the context state and functions
interface PostDrawerContextType {
    post: MapPostDataInterface | undefined;
    openDrawer: boolean;
    setPost: (post: MapPostDataInterface) => void;
    setOpenDrawer: (open: boolean) => void;
    toggleDrawer: (
        open: boolean,
    ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
    refCallbackOpenDrawer: MutableRefObject<(open: boolean) => void>;
}

// Create the context with default values
const PostDrawerContext = createContext<PostDrawerContextType | undefined>(
    undefined,
);

// Create a provider component
export const PostDrawerProvider = ({ children }: { children: ReactNode }) => {
    const [post, setPost] = useState<MapPostDataInterface>();
    const { openDrawer, setOpenDrawer, toggleDrawer, refCallbackOpenDrawer } =
        useCommonDrawer();

    return (
        <PostDrawerContext.Provider
            value={{
                post,
                openDrawer,
                setPost,
                setOpenDrawer,
                toggleDrawer,
                refCallbackOpenDrawer,
            }}
        >
            {children}
        </PostDrawerContext.Provider>
    );
};

// Custom hook for accessing the context easily
export const usePostDrawer = () => {
    const context = useContext(PostDrawerContext);
    if (!context) {
        throw new Error(
            'usePostDrawer must be used within a PostDrawerProvider',
        );
    }
    return context;
};
