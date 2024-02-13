import { Alert, Box, Divider, Tab, Tabs } from '@mui/material';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LanguageIcon from '@mui/icons-material/Language';
import { useScopedI18n } from '@/locales/client';
import {
    FacebookEmbed,
    InstagramEmbed,
    TikTokEmbed,
    TwitterEmbed,
    YouTubeEmbed,
} from 'react-social-media-embed';
import TabPanel, { a11yProps } from '@/components/tab/TabPanel';
import {
    MapPostDataInterface,
    PostUrlType,
} from '@/types/api/responses/map-post-data.interface';
import { useEffect, useState } from 'react';
import SocialMediaEnum from '@/types/social-media.enum';
import CheckIcon from '@mui/icons-material/Check';
import SingleAccordion from '@/components/accordion/SingleAccordion';

type Props = {
    post: MapPostDataInterface;
};

export default function SocialMediaPost({ post }: Props) {
    const t = useScopedI18n('post.url');

    const [activeTab, setActiveTab] = useState<SocialMediaEnum | ''>('');
    const [postUrl, setPostUrl] = useState<PostUrlType>({} as PostUrlType);

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: SocialMediaEnum,
    ) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        const ePostUrl = post.post_url;
        if (ePostUrl) {
            delete ePostUrl._id;
            setPostUrl(ePostUrl);
            const objKey = Object.keys(ePostUrl);
            const activeKey =
                objKey.length > 0 ? (objKey[0] as SocialMediaEnum) : '';
            setActiveTab(activeKey);
        }
    }, [post]);

    return (
        <>
            {Object.keys(postUrl).length > 0 && (
                <>
                    <Divider />
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        textColor='inherit'
                        variant='scrollable'
                        scrollButtons
                        allowScrollButtonsMobile
                        style={{ maxWidth: '350px' }}
                    >
                        {postUrl.instagram && (
                            <Tab
                                icon={
                                    <MyImage
                                        src={`${ASSETS.ICON}instagram.png`}
                                        alt={SocialMediaEnum.INSTAGRAM}
                                        width={28}
                                        className='mr-2 align-text-bottom'
                                    />
                                }
                                value={SocialMediaEnum.INSTAGRAM}
                                {...a11yProps(SocialMediaEnum.INSTAGRAM)}
                            />
                        )}
                        {postUrl.tiktok && (
                            <Tab
                                icon={
                                    <MyImage
                                        src={`${ASSETS.ICON}tiktok.ico`}
                                        alt={SocialMediaEnum.INSTAGRAM}
                                        width={28}
                                        className='mr-2 align-text-bottom'
                                    />
                                }
                                value={SocialMediaEnum.TIKTOK}
                                {...a11yProps(SocialMediaEnum.TIKTOK)}
                            />
                        )}
                        {postUrl.twitter && (
                            <Tab
                                icon={
                                    <MyImage
                                        src={`${ASSETS.ICON}twitter.ico`}
                                        alt={SocialMediaEnum.TWITTER}
                                        width={28}
                                        className='mr-2 align-text-bottom'
                                    />
                                }
                                value={SocialMediaEnum.TWITTER}
                                {...a11yProps(SocialMediaEnum.TWITTER)}
                            />
                        )}
                        {postUrl.facebook && (
                            <Tab
                                icon={
                                    <MyImage
                                        src={`${ASSETS.ICON}facebook.ico`}
                                        alt={SocialMediaEnum.FACEBOOK}
                                        width={28}
                                        className='mr-2 align-text-bottom'
                                    />
                                }
                                value={SocialMediaEnum.FACEBOOK}
                                {...a11yProps(SocialMediaEnum.FACEBOOK)}
                            />
                        )}
                        {postUrl.youtube && (
                            <Tab
                                icon={
                                    <MyImage
                                        src={`${ASSETS.ICON}youtube.png`}
                                        alt={SocialMediaEnum.YOUTUBE}
                                        width={28}
                                        className='mr-2 align-text-bottom'
                                    />
                                }
                                value={SocialMediaEnum.YOUTUBE}
                                {...a11yProps(SocialMediaEnum.YOUTUBE)}
                            />
                        )}
                        {postUrl.news_website && (
                            <Tab
                                icon={
                                    <NewspaperIcon
                                        sx={{ width: 28 }}
                                        className='my-1 mr-2'
                                    />
                                }
                                value={SocialMediaEnum.NEWS_WEBSITE}
                                {...a11yProps(SocialMediaEnum.NEWS_WEBSITE)}
                            />
                        )}
                        {postUrl.other && (
                            <Tab
                                icon={
                                    <LanguageIcon
                                        sx={{ width: 28 }}
                                        className='my-1 mr-2'
                                    />
                                }
                                value={SocialMediaEnum.OTHER}
                                {...a11yProps(SocialMediaEnum.OTHER)}
                            />
                        )}
                    </Tabs>
                </>
            )}

            <Box>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.INSTAGRAM}
                    className='text-center'
                >
                    <SingleAccordion title='Instagram' defaultOpen>
                        <Box className='bg-white mx-auto w-fit'>
                            <InstagramEmbed
                                url={postUrl?.instagram || ''}
                                width={325}
                            />
                        </Box>
                    </SingleAccordion>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.TIKTOK}
                    className='text-center'
                >
                    <SingleAccordion title='Tiktok' defaultOpen>
                        <Box className='bg-white mx-auto w-fit'>
                            <TikTokEmbed
                                url={postUrl?.tiktok || ''}
                                width={325}
                            />
                        </Box>
                    </SingleAccordion>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.TWITTER}
                    className='text-center'
                >
                    <SingleAccordion title='Twitter' defaultOpen>
                        <Box className='bg-white mx-auto w-fit'>
                            <TwitterEmbed
                                url={postUrl?.twitter || ''}
                                width={325}
                            />
                        </Box>
                    </SingleAccordion>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.FACEBOOK}
                    className='text-center'
                >
                    <SingleAccordion title='Facebook' defaultOpen>
                        <Box className='bg-white mx-auto w-fit'>
                            <FacebookEmbed
                                url={postUrl?.facebook || ''}
                                width={325}
                            />
                        </Box>
                    </SingleAccordion>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.YOUTUBE}
                    className='text-center'
                >
                    <SingleAccordion title='YouTube' defaultOpen>
                        <Box className='bg-white mx-auto w-fit'>
                            <YouTubeEmbed
                                url={postUrl?.youtube || ''}
                                width={325}
                            />
                        </Box>
                    </SingleAccordion>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.NEWS_WEBSITE}
                    className='text-center'
                >
                    <Box className='mx-auto w-fit'>
                        <Alert
                            icon={<CheckIcon fontSize='inherit' />}
                            severity='success'
                            className='max-w-[325px] whitespace-normal break-all'
                            onClick={() =>
                                window.open(postUrl?.news_website, '_blank')
                            }
                        >
                            {postUrl?.news_website}
                        </Alert>
                    </Box>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.OTHER}
                    className='text-center'
                >
                    <Box className='mx-auto w-fit'>
                        <Alert
                            icon={<CheckIcon fontSize='inherit' />}
                            severity='success'
                            className='max-w-[325px] whitespace-normal break-all'
                            onClick={() =>
                                window.open(postUrl?.other, '_blank')
                            }
                        >
                            {postUrl?.other}
                        </Alert>
                    </Box>
                </TabPanel>
            </Box>
        </>
    );
}
