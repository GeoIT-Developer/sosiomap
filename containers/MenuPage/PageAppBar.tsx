import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useI18n } from '@/locales/client';
import MyImage from '@/components/preview/MyImage';

export default function PageAppBar() {
    const t = useI18n();
    return (
        <Box>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
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
