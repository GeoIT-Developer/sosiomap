'use client';

import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { useEffect } from 'react';
import { useMainTopic } from '@/hooks/useTopic';
import { ASSETS, ROUTE_EXTERNAL } from '@/utils/constant';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import SocialMediaFooter from './SocialMediaFooter';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function AboutPage() {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();
    const mainTopic = useMainTopic();

    useEffect(() => {
        document.title = t('app.name') + ' - ' + t('navigation.about');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BackAppBar title={t('navigation.about')} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto p-4'
            >
                <Paper className='max-w-2xl mx-auto p-4'>
                    <Stack spacing={1}>
                        <Typography variant='h4' component='h1'>
                            {t('navigation.about')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('app.name')}</b> : {t('app.description')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('about.desc')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('about.title_1')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('about.desc_1')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('about.title_2')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('about.desc_2')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('about.title_3')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('about.desc_3')}
                        </Typography>

                        {mainTopic.map((item, idx) => {
                            return (
                                <Box className='flex mt-2' key={idx}>
                                    <Typography
                                        sx={{
                                            width: '25%',
                                            flexShrink: 0,
                                            fontWeight: 'bold',
                                        }}
                                        variant='body2'
                                    >
                                        {item.label}
                                    </Typography>
                                    <Typography variant='body2'>
                                        {item.description}
                                    </Typography>
                                </Box>
                            );
                        })}
                        <SocialMediaFooter />
                    </Stack>
                </Paper>
                <Paper className='max-w-2xl mx-auto p-4 mt-4'>
                    <Stack spacing={1} className='text-center align-center'>
                        <Typography variant='h4' component='h1'>
                            {t('about.our_team')}
                        </Typography>
                        <Divider />
                        <Avatar
                            alt='Alfa : Front End Developer'
                            src={`${ASSETS.TEAM}frontend.jpg`}
                            sx={{ width: '10rem', height: '10rem' }}
                            className='!mx-auto'
                        />
                        <Typography variant='body1'>
                            <b>Alfa</b>
                            <br />
                            Front End Developer
                            <br />
                            <IconButton
                                aria-label='LinkedIn'
                                onClick={() =>
                                    window.open(
                                        ROUTE_EXTERNAL.LINKEDIN_ALF.URL,
                                        '_blank',
                                    )
                                }
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Typography>
                        <Divider />

                        <Avatar
                            alt='Dila : Back End Developer'
                            src={`${ASSETS.TEAM}backend.jpg`}
                            sx={{ width: '10rem', height: '10rem' }}
                            className='!mx-auto'
                        />
                        <Typography variant='body1'>
                            <b>Dila</b>
                            <br />
                            Back End Developer
                            <br />
                            <IconButton
                                aria-label='YouTube'
                                onClick={() =>
                                    window.open(
                                        ROUTE_EXTERNAL.YOUTUBE_ALF.URL,
                                        '_blank',
                                    )
                                }
                            >
                                <YouTubeIcon />
                            </IconButton>
                        </Typography>
                        <Divider />

                        <Avatar
                            alt='Anas : DevOps Engineer'
                            src={`${ASSETS.TEAM}devops.jpg`}
                            sx={{ width: '10rem', height: '10rem' }}
                            className='!mx-auto'
                        />
                        <Typography variant='body1'>
                            <b>Anas</b>
                            <br />
                            DevOps Engineer
                            <br />
                            <IconButton
                                aria-label='Website'
                                onClick={() =>
                                    window.open(
                                        ROUTE_EXTERNAL.GEOIT_DEVELOPER.URL,
                                        '_blank',
                                    )
                                }
                            >
                                <LanguageIcon />
                            </IconButton>
                        </Typography>
                        <Divider />

                        <Avatar
                            alt='Alan : Marketing Specialist'
                            src={`${ASSETS.TEAM}marketing.jpg`}
                            sx={{ width: '10rem', height: '10rem' }}
                            className='!mx-auto'
                        />
                        <Typography variant='body1'>
                            <b>Alan</b>
                            <br />
                            Marketing Specialist
                            <br />
                            <IconButton
                                aria-label='Instagram'
                                onClick={() =>
                                    window.open(
                                        ROUTE_EXTERNAL.INSTAGRAM_ALF.URL,
                                        '_blank',
                                    )
                                }
                            >
                                <InstagramIcon />
                            </IconButton>
                        </Typography>
                        <Divider />

                        <Avatar
                            alt='Fadil : Graphic Designer'
                            src={`${ASSETS.TEAM}designer.png`}
                            sx={{ width: '10rem', height: '10rem' }}
                            className='!mx-auto'
                        />
                        <Typography variant='body1'>
                            <b>Fadil</b>
                            <br />
                            Graphic Designer
                            <br />
                            <IconButton
                                aria-label='X/Twitter'
                                onClick={() =>
                                    window.open(
                                        ROUTE_EXTERNAL.X_TWITTER_ALF.URL,
                                        '_blank',
                                    )
                                }
                            >
                                <XIcon />
                            </IconButton>
                        </Typography>
                        <Divider />

                        <Avatar
                            alt='[ADA] : Digital Assistant'
                            src={`${ASSETS.TEAM}digital.png`}
                            sx={{ width: '10rem', height: '10rem' }}
                            className='!mx-auto'
                        />
                        <Typography variant='body1'>
                            <b>[ADA]</b>
                            <br />
                            Digital Assistant
                            <br />
                            <IconButton
                                aria-label='GitHub'
                                onClick={() =>
                                    window.open(
                                        ROUTE_EXTERNAL.GITHUB_ALF.URL,
                                        '_blank',
                                    )
                                }
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Typography>
                        <Divider />
                    </Stack>
                </Paper>
            </Box>
        </div>
    );
}
