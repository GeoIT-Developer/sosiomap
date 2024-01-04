import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ChatIcon from '@mui/icons-material/Chat';
import { Select } from '@mui/material';
import { useI18n } from '@/locales/client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE } from '@/utils/constant';

enum ChatChannelEnum {
    GENERAL = 'general',
    LOCAL = 'local',
}

export default function PageAppBar() {
    const t = useI18n();
    const [channel, setChannel] = useLocalStorage(
        LOCAL_STORAGE.CHAT_CHANNEL,
        ChatChannelEnum.GENERAL,
    );
    return (
        <Box>
            <AppBar position='sticky'>
                <Toolbar>
                    <ChatIcon
                        color='inherit'
                        aria-label='chat-icon'
                        sx={{ mr: 2 }}
                    />
                    <Typography variant='h6' noWrap component='div'>
                        {t('navigation.chat')}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Select
                        value={channel}
                        size='small'
                        onChange={(e) =>
                            setChannel(e.target.value as ChatChannelEnum)
                        }
                        sx={{
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                        }}
                    >
                        <MenuItem value={ChatChannelEnum.GENERAL}>
                            {t('label.general')}
                        </MenuItem>
                        <MenuItem value={ChatChannelEnum.LOCAL}>
                            {t('label.local')}
                        </MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
