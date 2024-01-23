import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useI18n } from '@/locales/client';
import { ListItemIcon, ListItemText, MenuItem, useTheme } from '@mui/material';
import MyLogo from '@/components/preview/MyLogo';
import BasicMenu from '@/components/menu/BasicMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';
import DownloadIcon from '@mui/icons-material/Download';

export default function PageAppBar() {
    const t = useI18n();
    const theme = useTheme();
    const isLightMode = theme.palette.mode === 'light';
    const router = useRouter();

    return (
        <Box>
            <AppBar position='sticky'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        className='!mr-2'
                    >
                        <MyLogo color={isLightMode ? 'white' : 'default'} />
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        {t('app.name')}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <BasicMenu
                            menuID='more'
                            menuButton={
                                <IconButton size='medium' color='inherit'>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        >
                            <MenuItem
                                onClick={() =>
                                    router.push(ROUTE.DOWNLOAD_DATA.URL)
                                }
                            >
                                <ListItemIcon>
                                    <DownloadIcon fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>
                                    {t('navigation.download_data')}
                                </ListItemText>
                            </MenuItem>
                        </BasicMenu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
