/* eslint-disable react-hooks/exhaustive-deps */
import { useScopedI18n } from '@/locales/client';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TrafficIcon from '@mui/icons-material/Traffic';
import ForestIcon from '@mui/icons-material/Forest';
import FloodIcon from '@mui/icons-material/Flood';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DiscountIcon from '@mui/icons-material/Discount';
import {
    green,
    red,
    blue,
    amber,
    blueGrey,
    brown,
    indigo,
    yellow,
    grey,
    lime,
    deepPurple,
    pink,
    orange,
} from '@mui/material/colors';
import FeedIcon from '@mui/icons-material/Feed';
import HideImageIcon from '@mui/icons-material/HideImage';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import FlightIcon from '@mui/icons-material/Flight';
import StoreIcon from '@mui/icons-material/Store';
import { useEffect, useMemo, useState } from 'react';
import useLocalStorageFunc from './useLocalStorageFunc';
import { LOCAL_STORAGE } from '@/utils/constant';

export type TopicType = {
    id: string;
    label: string;
    description: string;
    group: string;
    icon: JSX.Element | string;
    bgColor: string;
    addNew?: boolean;
    location?: {
        useCurrentLocation?: boolean;
        chooseOnMap?: boolean;
        useApproximateLocation?: boolean;
        drawOnMap?: boolean;
    };
    date?: {
        startDate?: boolean;
        endDate?: boolean;
        dateTime?: boolean;
        timeless?: boolean;
        transient?: boolean;
    };
};

export const useMainTopic = () => {
    const t = useScopedI18n('topic');
    const mainTopic: TopicType[] = useMemo(
        (): TopicType[] => [
            {
                id: 'user_stories',
                label: t('main.user_stories'),
                description: t('main.user_stories_desc'),
                group: t('main_topics'),
                icon: <LocalActivityIcon sx={{ color: 'white' }} />,
                bgColor: blue[500],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    transient: true,
                },
            },
            {
                id: 'events',
                label: t('main.events'),
                description: t('main.events_desc'),
                group: t('main_topics'),
                icon: <CelebrationIcon sx={{ color: grey[900] }} />,
                bgColor: amber[600],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    startDate: true,
                    endDate: true,
                },
            },
            {
                id: 'news',
                label: t('main.news'),
                description: t('main.news_desc'),
                group: t('main_topics'),
                icon: <FeedIcon sx={{ color: 'white' }} />,
                bgColor: deepPurple[400],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    transient: true,
                    dateTime: true,
                },
            },
            {
                id: 'tourism',
                label: t('main.tourism'),
                description: t('main.tourism_desc'),
                group: t('main_topics'),
                icon: <FlightIcon sx={{ color: 'white' }} />,
                bgColor: pink[300],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    timeless: true,
                },
            },
            {
                id: 'traffic',
                label: t('main.traffic'),
                description: t('main.traffic_desc'),
                group: t('main_topics'),
                icon: <TrafficIcon sx={{ color: 'white' }} />,
                bgColor: blueGrey[600],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    transient: true,
                    dateTime: true,
                },
            },
            {
                id: 'environment',
                label: t('main.environment'),
                description: t('main.environment_desc'),
                group: t('main_topics'),
                icon: <ForestIcon sx={{ color: 'white' }} />,
                bgColor: green[500],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    timeless: true,
                },
            },
            {
                id: 'disaster',
                label: t('main.disaster'),
                description: t('main.disaster_desc'),
                group: t('main_topics'),
                icon: <FloodIcon sx={{ color: 'white' }} />,
                bgColor: brown[800],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    transient: true,
                    dateTime: true,
                },
            },
            {
                id: 'social',
                label: t('main.social'),
                description: t('main.social_desc'),
                group: t('main_topics'),
                icon: <VolunteerActivismIcon sx={{ color: 'white' }} />,
                bgColor: red[500],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    transient: true,
                    dateTime: true,
                },
            },
            {
                id: 'marketplace',
                label: t('main.marketplace'),
                description: t('main.marketplace_desc'),
                group: t('main_topics'),
                icon: <StoreIcon sx={{ color: 'white' }} />,
                bgColor: orange[800],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    startDate: true,
                    endDate: true,
                },
            },
            {
                id: 'promo',
                label: t('main.promo'),
                description: t('main.promo_desc'),
                group: t('main_topics'),
                icon: <DiscountIcon sx={{ color: grey[900] }} />,
                bgColor: yellow['A200'],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    startDate: true,
                    endDate: true,
                },
            },
            {
                id: 'q_and_a',
                label: t('main.q_and_a'),
                description: t('main.q_and_a_desc'),
                group: t('main_topics'),
                icon: <LiveHelpIcon sx={{ color: 'white' }} />,
                bgColor: lime[900],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    startDate: true,
                    endDate: true,
                },
            },
        ],
        [],
    );
    return mainTopic;
};

export const usePemiluTopic = () => {
    const t = useScopedI18n('topic');

    const pemilu2024: TopicType[] = useMemo(
        (): TopicType[] => [
            {
                id: 'dpr',
                label: t('pemilu2024.dpr'),
                description: t('pemilu2024.dpr_desc'),
                group: t('pemilu_2024'),
                icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
                bgColor: indigo[500],
            },
            {
                id: 'dpd',
                label: t('pemilu2024.dpd'),
                description: t('pemilu2024.dpd_desc'),
                group: t('pemilu_2024'),
                icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
                bgColor: indigo[500],
            },
            {
                id: 'dprd_provinsi',
                label: t('pemilu2024.dprd_provinsi'),
                description: t('pemilu2024.dprd_provinsi_desc'),
                group: t('pemilu_2024'),
                icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
                bgColor: indigo[500],
            },
            {
                id: 'dprd_kab_kota',
                label: t('pemilu2024.dprd_kab_kota'),
                description: t('pemilu2024.dprd_kab_kota_desc'),
                group: t('pemilu_2024'),
                icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
                bgColor: indigo[500],
            },
            {
                id: 'voting',
                label: t('pemilu2024.voting'),
                description: t('pemilu2024.voting_desc'),
                group: t('pemilu_2024'),
                icon: <HowToVoteIcon sx={{ color: grey[900] }} />,
                bgColor: yellow[500],
                addNew: true,
                location: {
                    useApproximateLocation: true,
                },
                date: {
                    timeless: true,
                },
            },
            {
                id: 'kecurangan',
                label: t('pemilu2024.kecurangan'),
                description: t('pemilu2024.kecurangan_desc'),
                group: t('pemilu_2024'),
                icon: <HighlightOffIcon sx={{ color: 'white' }} />,
                bgColor: red[900],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    timeless: true,
                },
            },
            {
                id: 'spanduk_ilegal',
                label: t('pemilu2024.spanduk_ilegal'),
                description: t('pemilu2024.spanduk_ilegal_desc'),
                group: t('pemilu_2024'),
                icon: <HideImageIcon sx={{ color: 'white' }} />,
                bgColor: red[900],
                addNew: true,
                location: {
                    useCurrentLocation: true,
                    chooseOnMap: true,
                },
                date: {
                    timeless: true,
                },
            },
        ],
        [],
    );

    return pemilu2024;
};

export const useActiveTopic = () => {
    const mainTopic = useMainTopic();
    const pemiluTopic = usePemiluTopic();
    const activeTopicStorage = useLocalStorageFunc<string[]>(
        LOCAL_STORAGE.ACTIVE_TOPIC,
        mainTopic.map((item) => item.id),
    );
    const [activeTopic, setActiveTopic] = useState<TopicType[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        function getActiveTopic() {
            const active = activeTopicStorage.getItem();
            const allTopic = [...mainTopic, ...pemiluTopic];
            const showTopic = allTopic.filter(
                (item) => active.includes(item.id) && item.addNew,
            );
            return showTopic;
        }

        const newActiveTopic = getActiveTopic();
        setActiveTopic(newActiveTopic);
    }, [refresh]);

    function onRefresh() {
        setRefresh(new Date().getTime());
    }

    return { activeTopic, refreshTopic: onRefresh };
};
