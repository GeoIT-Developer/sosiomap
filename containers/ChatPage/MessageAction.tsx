import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useScopedI18n } from '@/locales/client';

const MESSAGE_LENGTH = 200;

export default function MessageAction() {
    const t = useScopedI18n('label');
    const [message, setMessage] = useState('');

    const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        const eVal = e.target.value;
        if (eVal.length <= MESSAGE_LENGTH) {
            setMessage(eVal);
        }
    };

    const onClickSend = () => {
        toast(message);
        setMessage('');
    };

    return (
        <Box className='py-2 px-4 flex items-end'>
            <TextField
                variant='standard'
                className='flex-grow'
                placeholder={t('message')}
                multiline
                value={message}
                onChange={onChangeMessage}
            />
            <IconButton color='primary' aria-label='send' onClick={onClickSend}>
                <SendIcon />
            </IconButton>
        </Box>
    );
}
