import { Box, CircularProgress, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useI18n } from '@/locales/client';
import { GeolocationHook } from '@/hooks/useGeolocation';
import API from '@/configs/api';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import { LOCAL_STORAGE, MAX_LENGTH } from '@/utils/constant';
import { ChatChannelEnum } from './PageAppBar';
import useWideScreen from '@/hooks/useWideScreen';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { PostChatParamsInterface } from '@/types/api/params/post-chat.interface';
import MainFab from '@/components/button/MainFab';

const MIN_MESSAGE_LENGTH = MAX_LENGTH.CHAT.MIN_CHAT;
const MAX_MESSAGE_LENGTH = MAX_LENGTH.CHAT.MAX_CHAT;

type Props = {
    onRefresh: () => void;
    geolocation: GeolocationHook;
};

export default function MessageAction({ geolocation, onRefresh }: Props) {
    const t = useI18n();
    const [message, setMessage] = useState('');
    const isWide = useWideScreen();
    const [loadingSendButton, setLoadingSendButton] = useState(false);
    const apiPostChat = useAPI<ObjectLiteral, PostChatParamsInterface>(
        API.postChat,
        {
            onSuccess: () => {
                setMessage('');
                onRefresh();
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
            },
        },
    );

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
        setLoadingSendButton(true);
        geolocation
            .getLatestGeolocation()
            .then((resLoc) => {
                apiPostChat.call({
                    lat: resLoc.latitude,
                    lon: resLoc.longitude,
                    channel: channelStorage.getItem(),
                    body: message,
                });
            })
            .catch((err) => {
                toast(err);
            })
            .finally(() => setLoadingSendButton(false));
    };

    const handleEnterKeyPress = (event: any) => {
        if (isWide && event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onClickSend();
        }
    };

    return (
        <Box className='py-2 px-4 flex items-end gap-2'>
            <TextField
                size='small'
                variant='outlined'
                className='flex-grow'
                placeholder={t('label.message')}
                multiline
                value={message}
                onChange={onChangeMessage}
                onKeyDown={handleEnterKeyPress}
            />
            <MainFab
                size='small'
                color='primary'
                aria-label='send'
                onClick={onClickSend}
                disabled={loadingSendButton || apiPostChat.loading}
            >
                {loadingSendButton || apiPostChat.loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <SendIcon />
                )}
            </MainFab>
        </Box>
    );
}
