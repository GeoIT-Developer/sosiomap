import {
    Alert,
    AlertTitle,
    Box,
    CircularProgress,
    Divider,
    Paper,
    Slider,
    Stack,
    Typography,
} from '@mui/material';
import PageAppBar, { ChatChannelEnum } from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import { useI18n } from '@/locales/client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE } from '@/utils/constant';
import MessageAction from './MessageAction';
import usePageLoaded from '@/hooks/usePageLoaded';
import useGeolocation, { MyLocation } from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';
import API from '@/configs/api';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import RefreshIcon from '@mui/icons-material/Refresh';
import MessageWindow from './MessageWindow';
import MainFab from '@/components/button/MainFab';
import { ChatDataInterface } from '@/types/api/responses/chat-data.interface';
import useAPI from '@/hooks/useAPI';
import { GetPublicChatParamsInterface } from '@/types/api/params/get-public-chat.interface';
import useRefresh from '@/hooks/useRefresh';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { formatDateTime } from '@/utils/helper';

function valueKeyToDistance(value: number) {
    switch (value) {
        case 1:
            return 2;
        case 2:
            return 5;
        case 3:
            return 10;
        case 4:
            return 20;
        case 5:
            return 50;
        case 6:
            return 100;
        default:
            return 0;
    }
}

const distanceKey = [1, 2, 3, 4, 5, 6].map((value) => ({
    value,
}));

export default function ChatPage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();
    const geolocation = useGeolocation();
    const t = useI18n();
    const [refresh, setRefresh] = useRefresh();

    const [distance, setDistance] = useLocalStorage(
        LOCAL_STORAGE.CHAT_DISTANCE,
        2,
    );
    const [listChat, setListChat] = useState<ChatDataInterface[]>([]);

    const channelStorage = useLocalStorageFunc(
        LOCAL_STORAGE.CHAT_CHANNEL,
        ChatChannelEnum.GENERAL,
    );
    const lastLocationStorage = useLocalStorageFunc<null | MyLocation>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );

    const apiPublicChat = useAPI<
        ObjectLiteral,
        GetPublicChatParamsInterface,
        ChatDataInterface[]
    >(API.getPublicChat, {
        listkey: 'data',
        onSuccess: (_raw, res) => {
            const reverseList = (res?.list || []).slice().reverse();

            let currentDate: string = '';
            const listWithLabel = reverseList.map((item) => {
                const itemDate = formatDateTime(item.created_at, 'YYYY-MM-DD');
                const isNewDate = currentDate !== itemDate;
                let rootLabelDate = false;
                if (isNewDate) {
                    currentDate = itemDate;
                    rootLabelDate = true;
                }
                return { ...item, rootLabelDate };
            });

            setListChat(listWithLabel);
        },
    });

    useEffect(() => {
        if (!show) return;
        geolocation.requestGeolocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        if (!show) return;
        const myLoc = lastLocationStorage.getItem();
        if (!myLoc?.latitude || !myLoc.longitude) return;

        apiPublicChat.call({
            lat: myLoc.latitude,
            lon: myLoc.longitude,
            channel: channelStorage.getItem(),
            distance: valueKeyToDistance(distance),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [distance, show, refresh]);

    const pageLoaded = usePageLoaded(show);
    if (!show && !pageLoaded) {
        return null;
    }

    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar onRefresh={setRefresh} />
            <Paper
                className='flex flex-col !rounded-none'
                style={{ height: fragmentHeightStyle }}
            >
                {geolocation.error && (
                    <Alert severity='error'>
                        <AlertTitle>{geolocation.error}</AlertTitle>
                        {t('message.error.feature_need_geolocation')}
                    </Alert>
                )}
                <Stack
                    spacing={2}
                    direction='row'
                    className='px-4 items-center mr-2'
                >
                    <Typography variant='body1' className='flex-shrink'>
                        {valueKeyToDistance(distance)}
                        {t('unit.km')}
                    </Typography>
                    <Slider
                        aria-label='distance'
                        getAriaValueText={(value) => `${value}${t('unit.km')}`}
                        min={1}
                        max={6}
                        scale={valueKeyToDistance}
                        step={null}
                        marks={distanceKey}
                        size='medium'
                        onChange={(_e, value) => setDistance(Number(value))}
                        value={distance}
                        className='flex-grow'
                    />
                </Stack>
                <Divider light />
                <Box className='relative'>
                    <MainFab
                        size='small'
                        aria-label='refresh'
                        className='!absolute top-1 right-1'
                        onClick={setRefresh}
                    >
                        {apiPublicChat.loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            <RefreshIcon />
                        )}
                    </MainFab>
                </Box>
                <Box flex='1' overflow='auto' className='py-1'>
                    <MessageWindow
                        messages={listChat}
                        isLoading={apiPublicChat.loading}
                    />
                </Box>

                <Divider light />
                <NeedLogin className='pt-2 pb-4'>
                    <MessageAction
                        geolocation={geolocation}
                        onRefresh={setRefresh}
                    />
                </NeedLogin>
            </Paper>
        </div>
    );
}
