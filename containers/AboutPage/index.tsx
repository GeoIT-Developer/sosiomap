'use client';

import { Avatar, Box, Divider, Paper, Stack, Typography } from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { useEffect } from 'react';
import { useMainTopic } from '@/hooks/useTopic';
import { ASSETS } from '@/utils/constant';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';

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
                            <LinkedInIcon
                                onClick={() =>
                                    window.open(
                                        'https://www.linkedin.com/in/alfadila-anas/',
                                        '_blank',
                                    )
                                }
                            />
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
                            <YouTubeIcon
                                onClick={() =>
                                    window.open(
                                        'https://www.youtube.com/channel/UCom_vFWnb6-1TWgtMg4lt1g',
                                        '_blank',
                                    )
                                }
                            />
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
                            <LanguageIcon
                                onClick={() =>
                                    window.open('https://geoit.dev/', '_blank')
                                }
                            />
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
                            <GitHubIcon
                                onClick={() =>
                                    window.open(
                                        'https://github.com/Alf-Anas',
                                        '_blank',
                                    )
                                }
                            />
                        </Typography>
                        <Divider />
                    </Stack>
                </Paper>
            </Box>
        </div>
    );
}
