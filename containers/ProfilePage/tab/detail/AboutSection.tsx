import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { ROUTE } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import LinkIcon from '@mui/icons-material/Link';
import SocialMedia from './SocialMedia';
import { shareUrl, showError } from '@/utils';
import useAccessToken from '@/hooks/useAccessToken';
import EditProfile from './EditProfile';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import { useContext } from 'react';
import { ProfileContext } from '../../Content';

export default function AboutSection() {
    const t = useI18n();
    const accessToken = useAccessToken();
    const { profile } = useContext(ProfileContext);

    function shareProfile() {
        shareUrl(
            ROUTE.USER.DETAIL.setURL(accessToken?.preferred_username || ''),
            accessToken?.name || '',
            t('profile.share_profile'),
        ).catch((err) => {
            showError(err);
        });
    }

    const eProfile = profile?.profile;

    return (
        <Stack spacing={1} className='px-4'>
            <Box className='w-full'>
                <Typography
                    variant='body2'
                    className='break-all !text-sm whitespace-pre'
                >
                    {eProfile?.about || t('profile.default_about_section')}
                </Typography>
            </Box>
            {eProfile?.phone_number && (
                <Link
                    href={`tel:${eProfile.phone_number}`}
                    underline='hover'
                    className='!text-sm flex gap-1 items-center w-fit'
                >
                    <PhoneAndroidIcon fontSize='small' />
                    <span>{eProfile.phone_number}</span>
                </Link>
            )}
            {eProfile?.email && (
                <Link
                    href={`mailto:${eProfile.email}`}
                    underline='hover'
                    className='!text-sm flex gap-1 items-center w-fit'
                >
                    <EmailIcon fontSize='small' />
                    <span>{eProfile.email}</span>
                </Link>
            )}
            {eProfile?.website && (
                <Link
                    href={eProfile.website}
                    underline='hover'
                    className='!text-sm flex gap-1 items-center w-fit'
                    target='_blank'
                    rel='noopener'
                >
                    <LinkIcon fontSize='small' />
                    <span>{eProfile.website}</span>
                </Link>
            )}

            {eProfile && <SocialMedia profile={eProfile} />}
            <Box className='gap-1 flex self-center'>
                <EditProfile />
                <Button
                    variant='outlined'
                    color='inherit'
                    size='small'
                    onClick={shareProfile}
                    sx={{ textTransform: 'none' }}
                >
                    {t('profile.share_profile')}
                </Button>
            </Box>
        </Stack>
    );
}
