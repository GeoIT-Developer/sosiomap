import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import TabPanel, { a11yProps } from '@/components/tab/TabPanel';
import { useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import ProfileCover from './main/ProfileCover';
import ProfilePicture from './main/ProfilePicture';
import SummaryTab from '../ProfilePage/tab/summary';
import DetailTab from './tab/detail';
import PostTab from './tab/post';

enum ProfileTabEnum {
    DETAIL = 'detail',
    SUMMARY = 'summary',
    POST = 'post',
}

type Props = {
    user: ProfileDataInterface;
};

export default function UserContent({ user }: Props) {
    const [profileTab, setProfileTab] = useState<ProfileTabEnum>(
        ProfileTabEnum.DETAIL,
    );

    const handleProfileTabChange = (
        _event: React.SyntheticEvent,
        newValue: ProfileTabEnum,
    ) => {
        setProfileTab(newValue);
    };

    const eName = user.name || user.username;

    return (
        <Box className='flex-grow'>
            <ProfileCover photoURL={user?.cover_photo} />
            <Box className='w-full text-center'>
                <ProfilePicture name={eName} photoURL={user?.photo} />
                <Typography variant='body1'>{user.name}</Typography>
                <Typography variant='body2' className='opacity-50'>
                    @{user.username}
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
                    keepMounted
                >
                    <DetailTab profile={user} />
                </TabPanel>
                <TabPanel
                    value={profileTab}
                    index={ProfileTabEnum.SUMMARY}
                    keepMounted
                >
                    <SummaryTab profile={user} />
                </TabPanel>
                <TabPanel
                    value={profileTab}
                    index={ProfileTabEnum.POST}
                    keepMounted
                >
                    <PostTab username={user.username} />
                </TabPanel>
            </Box>
        </Box>
    );
}
