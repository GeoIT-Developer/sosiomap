'use client';

import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { CONTACT } from '@/utils/constant';

export default function PrivacyPolicyPage() {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();

    useEffect(() => {
        document.title = t('app.name') + ' - ' + t('navigation.privacy_policy');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BackAppBar title={t('navigation.privacy_policy')} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto p-4'
            >
                <Paper className='max-w-2xl mx-auto p-4'>
                    <Stack spacing={1}>
                        <Typography variant='h4' component='h1'>
                            {t('navigation.privacy_policy')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.effective_date')}{' '}
                            {dayjs('2024-02-18').format('DD MMM YYYY')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_1')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_2')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.title_2_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_2_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.title_2_2')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_2_2')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_3')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.title_3_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_3_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.title_3_2')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_3_2')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_4')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.title_4_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_4_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.title_4_2')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_4_2')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_5')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_5')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_6')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_6')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_7')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('privacy-policy.desc_7')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('privacy-policy.title_8')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {/* @ts-ignore */}
                            {t('privacy-policy.desc_8', {
                                email: (
                                    <Link
                                        href={`mailto:${CONTACT.EMAIL.ADDRESS}`}
                                    >
                                        {CONTACT.EMAIL.ADDRESS}
                                    </Link>
                                ),
                            })}
                        </Typography>

                        <Typography variant='body1'>
                            {t('privacy-policy.footer')}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </div>
    );
}
