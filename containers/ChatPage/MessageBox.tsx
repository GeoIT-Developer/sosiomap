import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useScopedI18n } from '@/locales/client';

export default function MessageBox() {
    const t = useScopedI18n('label');
    const [message, setMessage] = useState('');

    const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        const eVal = e.target.value;
        if (eVal.length < 200) {
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
