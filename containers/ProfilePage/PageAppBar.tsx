import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, MenuItem } from '@mui/material';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '@/contexts/ThemeContext';
import { useChangeLocale, useScopedI18n } from '@/locales/client';
import { LIST_COUNTRY } from '@/locales/country';
import BasicMenu from '@/components/menu/BasicMenu';
import MyImage from '@/components/preview/MyImage';
import { ASSETS, ROUTE } from '@/utils/constant';
import { useSession } from 'next-auth/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';

type UseChangeLocaleType = typeof useChangeLocale;
type NewLocaleType = Parameters<ReturnType<UseChangeLocaleType>>[0];

export default function PageAppBar() {
    const t = useScopedI18n('navigation');
    const changeLocale = useChangeLocale();
    const { mode, toggleColorMode } = useThemeMode();
    const session = useSession();
    const router = useRouter();

    const LIST_MORE_MENU = [
        {
            id: 'about',
            label: t('about'),
            url: ROUTE.ABOUT.URL,
        },
        {
            id: 'privacy-policy',
            label: t('privacy_policy'),
            url: ROUTE.PRIVACY_POLICY.URL,
        },
        {
            id: 'terms-and-conditions',
            label: t('terms_and_conditions'),
            url: ROUTE.TERMS_AND_CONDITIONS.URL,
        },
        {
            id: 'clear_data',
            label: t('clear_data'),
            url: ROUTE.CLEAR_DATA.URL,
        },
    ];

    return (
        <Box>
            <AppBar position='sticky'>
                <Toolbar>
                    <AccountCircleIcon
                        color='inherit'
                        aria-label='profile-icon'
                        sx={{ mr: 2 }}
                    />
                    <Typography variant='h6' noWrap component='div'>
                        {session.data?.user.name || t('profile')}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <IconButton
                            size='medium'
                            aria-label='theme'
                            color='inherit'
                            onClick={toggleColorMode}
                        >
                            {mode === 'dark' ? (
                                <LightModeIcon />
                            ) : (
                                <DarkModeIcon />
                            )}
                        </IconButton>

                        <BasicMenu
                            menuID='locale'
                            menuButton={
                                <IconButton size='medium' color='inherit'>
                                    <GTranslateIcon />
                                </IconButton>
                            }
                        >
                            {LIST_COUNTRY.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.locale}
                                        onClick={() =>
                                            changeLocale(
                                                item.locale.toLowerCase() as NewLocaleType,
                                            )
                                        }
                                    >
                                        <MyImage
                                            width='20'
                                            src={`${ASSETS.FLAG_IMAGE}${item.flag}`}
                                            alt={item.flag}
                                            className='mr-4'
                                        />
                                        {item.locale}
                                    </MenuItem>
                                );
                            })}
                        </BasicMenu>
                        <BasicMenu
                            menuID='more'
                            menuButton={
                                <IconButton size='medium' color='inherit'>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        >
                            {LIST_MORE_MENU.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id}
                                        onClick={() => router.push(item.url)}
                                    >
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                        </BasicMenu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
