import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import useAccessToken from '@/hooks/useAccessToken';
import TabPanel, { a11yProps } from '@/components/tab/TabPanel';
import { createContext, useEffect, useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import DetailTab from './tab/detail';
import useRefresh from '@/hooks/useRefresh';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import ProfileCover from './main/ProfileCover';
import ProfilePicture from './main/ProfilePicture';
import { toast } from 'react-toastify';
import SummaryTab from './tab/summary';
import PostTab from './tab/post';

enum ProfileTabEnum {
    DETAIL = 'detail',
    SUMMARY = 'summary',
    POST = 'post',
}

export const ProfileContext = createContext<{
    setRefresh: () => void;
    profile: ProfileDataInterface | undefined | null;
}>({ setRefresh: () => {}, profile: undefined });

export default function ProfileContent() {
    const accessToken = useAccessToken();
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

    const apiProfile = useAPI<ProfileDataInterface>(API.getProfile, {
        onError: (err) => {
            toast.error(err, {
                theme: 'colored',
            });
        },
    });

    const profileData = apiProfile.data || ({} as ProfileDataInterface);

    useEffect(() => {
        apiProfile.call();
    }, [refresh]);

    return (
        <Box className='flex-grow'>
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
                <Typography variant='body1'>{accessToken?.name}</Typography>
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
                <ProfileContext.Provider
                    value={{ setRefresh, profile: profileData }}
                >
                    <TabPanel
                        value={profileTab}
                        index={ProfileTabEnum.DETAIL}
                        keepMounted
                    >
                        <DetailTab />
                    </TabPanel>
                    <TabPanel
                        value={profileTab}
                        index={ProfileTabEnum.SUMMARY}
                        keepMounted
                    >
                        <SummaryTab profile={profileData} />
                    </TabPanel>
                    <TabPanel
                        value={profileTab}
                        index={ProfileTabEnum.POST}
                        keepMounted
                    >
                        <PostTab />
                    </TabPanel>
                </ProfileContext.Provider>
            </Box>
        </Box>
    );
}
