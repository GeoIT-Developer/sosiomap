'use client';

import { Box, Paper, Stack, Typography } from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function TermsAndConditionsPage() {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();

    useEffect(() => {
        document.title =
            t('app.name') + ' - ' + t('navigation.terms_and_conditions');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BackAppBar title={t('navigation.terms_and_conditions')} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto p-4'
            >
                <Paper className='max-w-2xl mx-auto p-4'>
                    <Stack spacing={1}>
                        <Typography variant='h4' component='h1'>
                            {t('navigation.terms_and_conditions')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.effective_date')}{' '}
                            {dayjs('2024-02-18').format('DD MMM YYYY')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_1')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_1_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_2')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_2_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_2_2')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_2_3')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_3')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_3_1')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_3_2')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_4')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_4_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_5')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_5_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_6')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_6_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_7')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_7_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_8')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('terms-and-conditions.desc_8_1')}
                        </Typography>

                        <Typography variant='body1'>
                            <b>{t('terms-and-conditions.title_9')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {/* @ts-ignore */}
                            {t('terms-and-conditions.desc_9_1', {
                                email: 'alf.anas@geoit.dev',
                            })}
                        </Typography>

                        <Typography variant='body1'>
                            {t('terms-and-conditions.footer')}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </div>
    );
}
