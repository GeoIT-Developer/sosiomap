'use client';

import { Box, Divider, IconButton, Stack } from '@mui/material';
import { useI18n } from '@/locales/client';
import { ROUTE_EXTERNAL } from '@/utils/constant';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function SocialMediaFooter() {
    const t = useI18n();

    return (
        <Box className='mt-4 mb-2'>
            <Divider>{t('about.follow_us')}</Divider>
            <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='center'
            >
                <IconButton
                    aria-label='LinkedIn'
                    onClick={() =>
                        window.open(ROUTE_EXTERNAL.LINKEDIN.URL, '_blank')
                    }
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton
                    aria-label='Instagram'
                    onClick={() =>
                        window.open(ROUTE_EXTERNAL.INSTAGRAM.URL, '_blank')
                    }
                >
                    <InstagramIcon />
                </IconButton>
                <IconButton
                    aria-label='X/Twitter'
                    onClick={() =>
                        window.open(ROUTE_EXTERNAL.X_TWITTER.URL, '_blank')
                    }
                >
                    <XIcon />
                </IconButton>
            </Stack>
        </Box>
    );
}
