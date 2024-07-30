import { Alert, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import PageAppBar from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import usePageLoaded from '@/hooks/usePageLoaded';
import useAccessToken from '@/hooks/useAccessToken';
import TabPanel, { a11yProps } from '@/components/tab/TabPanel';
import { createContext, useEffect, useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useI18n } from '@/locales/client';
import SocialMediaFooter from '../AboutPage/SocialMediaFooter';
import DetailTab from './tab/detail';
import useRefresh from '@/hooks/useRefresh';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import ProfileCover from './main/ProfileCover';
import ProfilePicture from './main/ProfilePicture';
import { toast } from 'react-toastify';

enum ProfileTabEnum {
    DETAIL = 'detail',
    SUMMARY = 'summary',
    POST = 'post',
}

export const RefreshContext = createContext<{
    setRefresh: () => void;
}>({ setRefresh: () => {} });

export default function ProfilePage({ show = true }: { show?: boolean }) {
    const t = useI18n();
    const { fragmentHeightStyle } = useWindowHeight();
    const accessToken = useAccessToken();
    const pageLoaded = usePageLoaded(show);
    const [refresh, setRefresh] = useRefresh();

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

    const { data: profileData, ...apiProfile } = useAPI<ProfileDataInterface>(
        API.getProfile,
        {
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
            },
        },
    );

    useEffect(() => {
        if (!pageLoaded) return;
        apiProfile.call();
    }, [refresh, pageLoaded]);

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
                    <ProfileCover
                        photoURL={profileData?.cover_photo}
                        onRefresh={setRefresh}
                    />
                    <Box className='w-full text-center'>
                        <ProfilePicture
                            name={eName}
                            photoURL={profileData?.photo}
                            onRefresh={setRefresh}
                        />
                        <Typography variant='body1'>
                            {accessToken?.name}
                        </Typography>
                        <Typography variant='body2' className='opacity-50'>
                            @{accessToken?.preferred_username}
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
                            <RefreshContext.Provider value={{ setRefresh }}>
                                <DetailTab profile={profileData} />
                            </RefreshContext.Provider>
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
                <SocialMediaFooter />
            </Paper>
        </div>
    );
}
