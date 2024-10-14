import { Box, Card, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MyImage from '@/components/preview/MyImage';
import {
    FacebookEmbed,
    InstagramEmbed,
    LinkedInEmbed,
    TikTokEmbed,
    TwitterEmbed,
    YouTubeEmbed,
} from 'react-social-media-embed';
import TabPanel from '@/components/tab/TabPanel';
import { PostUrlType } from '@/types/api/responses/map-post-data.interface';
import { cloneElement, useEffect, useState } from 'react';
import SocialMediaEnum from '@/types/social-media.enum';
import LinkPreview from '@/components/preview/LinkPreview';
import { SocialMediaURLType, useListSocialMedia } from '../New/SocialMediaPost';

type Props = {
    postUrlProps: PostUrlType;
};

export default function SocialMediaPost({ postUrlProps }: Props) {
    const [activeTab, setActiveTab] = useState<SocialMediaEnum | ''>('');
    const [postUrl, setPostUrl] = useState<PostUrlType>({} as PostUrlType);

    useEffect(() => {
        if (postUrlProps) {
            delete postUrlProps._id;
            setPostUrl(postUrlProps);
            const existKeys = Object.keys(postUrlProps);
            if (existKeys.length === 1) {
                setActiveTab(existKeys[0] as SocialMediaEnum);
            }
        }
    }, [postUrlProps]);

    const existKeys = Object.keys(postUrl);
    const listSocialMedia = useListSocialMedia(postUrl as SocialMediaURLType);

    const handleChangeFields = (
        _event: React.MouseEvent<HTMLElement>,
        newField: SocialMediaEnum | null,
    ) => {
        setActiveTab(newField || '');
    };

    return (
        <div>
            <ToggleButtonGroup
                value={activeTab}
                onChange={handleChangeFields}
                aria-label='fields'
                size='small'
                exclusive
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginTop: '0.25rem',
                    marginTBottom: '0.25rem',
                }}
            >
                {listSocialMedia.map((item, idx) => {
                    const isFieldChecked = existKeys.includes(item.id);
                    if (!isFieldChecked) return null;
                    return (
                        <ToggleButton key={idx} value={item.id}>
                            {typeof item.icon === 'string' ? (
                                <MyImage
                                    src={item.icon}
                                    alt={item.id}
                                    width={28}
                                    height={28}
                                />
                            ) : (
                                cloneElement(item.icon, {
                                    sx: { width: 28, height: 28 },
                                })
                            )}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>

            <Box>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.INSTAGRAM}
                    className='text-center'
                >
                    <Card
                        variant='outlined'
                        className='bg-white mx-auto w-fit px-1 pt-4 rounded-lg'
                    >
                        <InstagramEmbed
                            url={postUrl?.instagram || ''}
                            width={325}
                        />
                    </Card>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.TIKTOK}
                    className='text-center'
                >
                    <Card
                        variant='outlined'
                        className='bg-white mx-auto w-fit px-1 pt-4 rounded-lg'
                    >
                        <TikTokEmbed url={postUrl?.tiktok || ''} width={325} />
                    </Card>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.TWITTER}
                    className='text-center'
                >
                    <Card
                        variant='outlined'
                        className='bg-white mx-auto w-fit px-1 pt-4 rounded-lg'
                    >
                        <TwitterEmbed
                            url={postUrl?.twitter || ''}
                            width={325}
                        />
                    </Card>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.FACEBOOK}
                    className='text-center'
                >
                    <Card
                        variant='outlined'
                        className='bg-white mx-auto w-fit px-1 pt-4 rounded-lg'
                    >
                        <FacebookEmbed
                            url={postUrl?.facebook || ''}
                            width={325}
                        />
                    </Card>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.YOUTUBE}
                    className='text-center'
                >
                    <Card
                        variant='outlined'
                        className='bg-white mx-auto w-fit px-1 pt-4 rounded-lg'
                    >
                        <YouTubeEmbed
                            url={postUrl?.youtube || ''}
                            width={325}
                        />
                    </Card>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.LINKEDIN}
                    className='text-center'
                >
                    <Card
                        variant='outlined'
                        className='bg-white mx-auto w-fit px-1 pt-4 rounded-lg'
                    >
                        <LinkedInEmbed
                            url={postUrl?.linkedin || ''}
                            width={325}
                        />
                    </Card>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.NEWS_WEBSITE}
                    className='text-center'
                >
                    <Box className='mx-auto w-fit'>
                        {postUrl?.news_website && (
                            <LinkPreview url={postUrl?.news_website} />
                        )}
                    </Box>
                </TabPanel>
                <TabPanel
                    value={activeTab}
                    index={SocialMediaEnum.OTHER}
                    className='text-center'
                >
                    <Box className='mx-auto w-fit'>
                        {postUrl?.other && <LinkPreview url={postUrl?.other} />}
                    </Box>
                </TabPanel>
            </Box>
        </div>
    );
}
