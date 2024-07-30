import {
    Box,
    Button,
    IconButton,
    InputLabel,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import useAccessToken from '@/hooks/useAccessToken';
import { LOCAL_STORAGE, ROUTE } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import BasicMenu from '@/components/menu/BasicMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { signIn } from 'next-auth/react';
import useVisibilityChange from '@/hooks/useVisibilityChange';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import SingleAccordion from '@/components/accordion/SingleAccordion';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function AccountSection() {
    const t = useI18n();
    const accessToken = useAccessToken();
    const router = useRouter();

    const localStorageRefresh = useLocalStorageFunc(
        LOCAL_STORAGE.REFRESH_SIGN_IN,
        false,
    );

    useVisibilityChange(LOCAL_STORAGE.REFRESH_SIGN_IN, () =>
        signIn('keycloak'),
    );

    return (
        <SingleAccordion
            type='compact'
            title={
                <Typography className='flex gap-1'>
                    <AdminPanelSettingsIcon fontSize='small' />
                    <span>{t('label.account')}</span>
                </Typography>
            }
        >
            <Stack spacing={2}>
                <Box className='w-full'>
                    <InputLabel>{t('profile.username')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={accessToken?.preferred_username || ''}
                        disabled
                    />
                </Box>
                <Box className='w-full'>
                    <InputLabel>{t('profile.name')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={accessToken?.name || ''}
                        disabled
                    />
                </Box>
                <Box className='w-full'>
                    <InputLabel>{t('profile.email')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={accessToken?.email || ''}
                        disabled
                    />
                </Box>
                <Box className='w-full text-end'>
                    <Button
                        variant='outlined'
                        color='warning'
                        size='small'
                        startIcon={<EditIcon />}
                        onClick={() => {
                            localStorageRefresh.setItem(true);
                            window.open(
                                ROUTE.KEYCLOAK.EDIT_PROFILE.URL,
                                '_blank',
                            );
                        }}
                    >
                        {t('button.edit')}
                    </Button>
                    <BasicMenu
                        menuID='locale'
                        menuButton={
                            <IconButton size='medium' color='inherit'>
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem
                            dense
                            onClick={() =>
                                router.push(ROUTE.SETTING.ACCOUNT_DELETION.URL)
                            }
                        >
                            <span className='text-red-600'>
                                {t('setting.account_deletion.button_delete')}
                            </span>
                        </MenuItem>
                    </BasicMenu>
                </Box>
            </Stack>
        </SingleAccordion>
    );
}
