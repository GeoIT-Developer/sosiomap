import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useI18n } from '@/locales/client';
import { getUserAgent } from '@/utils/helper';
import { GeolocationHook } from '@/hooks/useGeolocation';
import API from '@/configs/api';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import { LOCAL_STORAGE, MAX_LENGTH } from '@/utils/constant';
import { ChatChannelEnum } from './PageAppBar';
import useWideScreen from '@/hooks/useWideScreen';

const MIN_MESSAGE_LENGTH = MAX_LENGTH.CHAT.MIN_CHAT;
const MAX_MESSAGE_LENGTH = MAX_LENGTH.CHAT.MAX_CHAT;

export default function MessageAction({
    geolocation,
}: {
    geolocation: GeolocationHook;
}) {
    const t = useI18n();
    const [message, setMessage] = useState('');
    const isWide = useWideScreen();

    const channelStorage = useLocalStorageFunc(
        LOCAL_STORAGE.CHAT_CHANNEL,
        ChatChannelEnum.GENERAL,
    );

    const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        const eVal = e.target.value;
        if (eVal.length <= MAX_MESSAGE_LENGTH) {
            setMessage(eVal);
        }
    };

    const onClickSend = () => {
        if (message.length === 0) {
            return;
        } else if (message.length < MIN_MESSAGE_LENGTH) {
            toast.error(t('message.error.message_at_least_minimum'), {
                theme: 'colored',
            });
            return;
        } else if (geolocation.error) {
            toast.error(t('message.error.feature_need_geolocation'), {
                theme: 'colored',
            });
            return;
        }
        geolocation
            .getLatestGeolocation()
            .then((resLoc) => {
                const userAgent = getUserAgent();
                console.log('SEND CHAT', {
                    message,
                    userAgent,
                    location: resLoc,
                });
                API.postChat(
                    resLoc.latitude,
                    resLoc.longitude,
                    channelStorage.getItem(),
                    message,
                )
                    .then((res) => {
                        console.log(res);
                        setMessage('');
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                toast(err);
            });
    };

    const handleEnterKeyPress = (event: any) => {
        if (isWide && event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onClickSend();
        }
    };

    return (
        <Box className='py-2 px-4 flex items-end'>
            <TextField
                variant='standard'
                className='flex-grow'
                placeholder={t('label.message')}
                multiline
                value={message}
                onChange={onChangeMessage}
                onKeyDown={handleEnterKeyPress}
            />
            <IconButton color='primary' aria-label='send' onClick={onClickSend}>
                <SendIcon />
            </IconButton>
        </Box>
    );
}
