import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useI18n } from '@/locales/client';
import MyImage from '@/components/preview/MyImage';
import { useTheme } from '@mui/material';

export default function PageAppBar() {
    const t = useI18n();
    const theme = useTheme();
    const isLightMode = theme.palette.mode === 'light';

    return (
        <Box>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        className={`!mr-2 ${
                            isLightMode ? '!bg-white !bg-opacity-75' : ''
                        }`}
                    >
                        <MyImage src='/logo.svg' alt='logo' className='h-8' />
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        {t('app.name')}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box></Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
