import {
    Alert,
    AlertTitle,
    Box,
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
import MessageBox from './MessageBox';
import MessageAction from './MessageAction';
import usePageLoaded from '@/hooks/usePageLoaded';
import useGeolocation from '@/hooks/useGeolocation';
import { useEffect, useState } from 'react';
import API from '@/configs/api';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import { ListChatInterface } from '@/types/list-chat.interface';

function calculateValue(value: number) {
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

const marks = [1, 2, 3, 4, 5, 6].map((value) => ({
    value,
    // label: calculateValue(value),
}));

export default function ChatPage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();
    const geolocation = useGeolocation();

    const t = useI18n();
    const [distance, setDistance] = useLocalStorage(
        LOCAL_STORAGE.CHAT_DISTANCE,
        2,
    );
    const [listChat, setListChat] = useState<ListChatInterface[]>([]);

    const channelStorage = useLocalStorageFunc(
        LOCAL_STORAGE.CHAT_CHANNEL,
        ChatChannelEnum.GENERAL,
    );

    useEffect(() => {
        geolocation.requestGeolocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        if (!show) return;
        if (!geolocation.location?.latitude || !geolocation.location?.latitude)
            return;
        API.getPublicChat(
            geolocation.location?.latitude,
            geolocation.location?.longitude,
            channelStorage.getItem(),
            calculateValue(distance),
        )
            .then((res) => {
                setListChat(res?.data?.data || []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [distance, show]);

    const pageLoaded = usePageLoaded(show);
    if (!show && !pageLoaded) {
        return null;
    }

    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
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
                        {calculateValue(distance)}
                        {t('unit.km')}
                    </Typography>
                    <Slider
                        aria-label='distance'
                        getAriaValueText={(value) => `${value}${t('unit.km')}`}
                        min={1}
                        max={6}
                        scale={calculateValue}
                        step={null}
                        marks={marks}
                        size='medium'
                        onChange={(_e, value) => setDistance(Number(value))}
                        value={distance}
                        className='flex-grow'
                    />
                </Stack>
                <Divider light />
                <Box flex='1' overflow='auto'>
                    {listChat.map((item, index) => (
                        <MessageBox
                            key={index}
                            name={item.name}
                            username={item.username}
                            body={item.body}
                            createdAt={item.created_at}
                        />
                    ))}
                </Box>

                <Divider light />
                <NeedLogin className='pt-2 pb-4'>
                    <MessageAction geolocation={geolocation} />
                </NeedLogin>
            </Paper>
        </div>
    );
}
