'use client';

import { Alert, Box, Paper } from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';

export default function DownloadDataPage() {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();
    return (
        <div>
            <BackAppBar title={t('navigation.download_data')} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto'
            >
                <Paper
                    className='flex items-center justify-center'
                    style={{ height: heightStyleAppBar }}
                >
                    <Alert color='info'>{t('message.info.coming_soon')}</Alert>
                </Paper>
            </Box>
        </div>
    );
}
