import {
    Alert,
    Avatar,
    Box,
    Button,
    Divider,
    InputLabel,
    Paper,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import PageAppBar from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import { useSession } from 'next-auth/react';
import usePageLoaded from '@/hooks/usePageLoaded';
import useAccessToken from '@/hooks/useAccessToken';
import TabPanel, { a11yProps } from '@/components/tab/TabPanel';
import { useState } from 'react';
import MyImage from '@/components/preview/MyImage';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ASSETS, ROUTE } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import { nameToInitial, stringToColor } from '@/utils/helper';
import { useRouter } from 'next/navigation';

enum ProfileTabEnum {
    DETAIL = 'detail',
    SUMMARY = 'summary',
    POST = 'post',
}

export default function ProfilePage({ show = true }: { show?: boolean }) {
    const t = useI18n();
    const { fragmentHeightStyle } = useWindowHeight();
    const session = useSession();
    const accessToken = useAccessToken();
    const pageLoaded = usePageLoaded(show);
    const router = useRouter();

    const [profileTab, setProfileTab] = useState<ProfileTabEnum>(
        ProfileTabEnum.DETAIL,
    );

    const handleProfileTabChange = (
        _event: React.SyntheticEvent,
        newValue: ProfileTabEnum,
    ) => {
        setProfileTab(newValue);
    };

    const eName = accessToken?.name || accessToken?.preferred_username || '';

    if (!show && !pageLoaded) {
        return null;
    }

    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
            <Paper
                className='overflow-y-auto !rounded-none'
                style={{ height: fragmentHeightStyle }}
            >
                <NeedLogin
                    className='flex items-center justify-center'
                    style={{ height: fragmentHeightStyle }}
                >
                    <Box className='aspect-[3/1] w-full overflow-hidden'>
                        <MyImage
                            src={`${ASSETS.PLACEHOLDER}profile_cover.jpg`}
                            alt='cover'
                            className='w-full object-cover h-full pb-0.5 bg-primary'
                        />
                    </Box>
                    <Box className='w-full text-center'>
                        <Avatar
                            sx={{
                                width: '5rem',
                                height: '5rem',
                                fontSize: 'xx-large',
                                fontWeight: 'bold',
                                bgcolor: stringToColor(eName),
                            }}
                            className='mx-auto mt-[-2.5rem] !p-0.5 bg-primary'
                            alt={accessToken?.name || 'profile'}
                        >
                            {nameToInitial(eName)}
                        </Avatar>
                        <Typography variant='body1'>
                            {session.data?.user.name}
                        </Typography>
                    </Box>
                    <Paper
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        }}
                    >
                        <Tabs
                            value={profileTab}
                            onChange={handleProfileTabChange}
                            textColor='inherit'
                            variant='fullWidth'
                        >
                            <Tab
                                icon={<AssignmentIndIcon />}
                                value={ProfileTabEnum.DETAIL}
                                {...a11yProps(ProfileTabEnum.DETAIL)}
                            />
                            <Tab
                                icon={<LeaderboardIcon />}
                                value={ProfileTabEnum.SUMMARY}
                                {...a11yProps(ProfileTabEnum.SUMMARY)}
                            />
                            <Tab
                                icon={<ViewListIcon />}
                                value={ProfileTabEnum.POST}
                                {...a11yProps(ProfileTabEnum.POST)}
                            />
                        </Tabs>
                    </Paper>
                    <Box>
                        <TabPanel
                            value={profileTab}
                            index={ProfileTabEnum.DETAIL}
                        >
                            <Stack spacing={2} className='p-4'>
                                <Box className='w-full'>
                                    <InputLabel>
                                        {t('profile.username')}
                                    </InputLabel>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        value={
                                            accessToken?.preferred_username ||
                                            ''
                                        }
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
                                    <InputLabel>
                                        {t('profile.email')}
                                    </InputLabel>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        value={accessToken?.email || ''}
                                        disabled
                                    />
                                </Box>
                                <Divider className='!mt-10' />

                                <Button
                                    variant='outlined'
                                    onClick={() =>
                                        router.push(
                                            ROUTE.SETTING.ACCOUNT_DELETION.URL,
                                        )
                                    }
                                >
                                    {t(
                                        'setting.account_deletion.button_delete',
                                    )}
                                </Button>
                            </Stack>
                        </TabPanel>
                        <TabPanel
                            value={profileTab}
                            index={ProfileTabEnum.SUMMARY}
                        >
                            <Alert color='info' className='m-2'>
                                {t('message.info.coming_soon')}
                            </Alert>
                        </TabPanel>
                        <TabPanel
                            value={profileTab}
                            index={ProfileTabEnum.POST}
                        >
                            <Alert color='info' className='m-2'>
                                {t('message.info.coming_soon')}
                            </Alert>
                        </TabPanel>
                    </Box>
                </NeedLogin>
            </Paper>
        </div>
    );
}
