import { useState } from 'react';
import PostContent from './Content';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import TabPanel, { a11yProps } from '@/components/tab/TabPanel';
import { useScopedI18n } from '@/locales/client';

enum ProfilePostTabEnum {
    MY_POST = 'my-post',
    SAVED = 'saved',
    ARCHIVED = 'archived',
}

export default function PostTab() {
    const t = useScopedI18n('post');

    const [activeTab, setActiveTab] = useState<ProfilePostTabEnum>(
        ProfilePostTabEnum.MY_POST,
    );

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: ProfilePostTabEnum,
    ) => {
        setActiveTab(newValue);
    };

    return (
        <>
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
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor='inherit'
                    variant='fullWidth'
                >
                    <Tab
                        label={t('my_posts')}
                        value={ProfilePostTabEnum.MY_POST}
                        {...a11yProps(ProfilePostTabEnum.MY_POST)}
                    />
                    <Tab
                        label={t('saved')}
                        value={ProfilePostTabEnum.SAVED}
                        {...a11yProps(ProfilePostTabEnum.SAVED)}
                    />
                    <Tab
                        label={t('archived')}
                        value={ProfilePostTabEnum.ARCHIVED}
                        {...a11yProps(ProfilePostTabEnum.ARCHIVED)}
                    />
                </Tabs>
            </Paper>
            <Box>
                <TabPanel
                    value={activeTab}
                    index={ProfilePostTabEnum.MY_POST}
                    keepMounted
                >
                    <PostContent type='my-post' />
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={ProfilePostTabEnum.SAVED}
                    keepMounted
                >
                    <PostContent type='saved' />
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={ProfilePostTabEnum.ARCHIVED}
                    keepMounted
                >
                    <PostContent type='archived' />
                </TabPanel>
            </Box>
        </>
    );
}
