import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { ROUTE } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import LinkIcon from '@mui/icons-material/Link';
import SocialMedia from './SocialMedia';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import { shareUrl, showError } from '@/utils';
import useAccessToken from '@/hooks/useAccessToken';
import EditProfile from './EditProfile';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';

type Props = {
    profile: ProfileDataInterface | undefined | null;
};

export default function AboutSection({ profile }: Props) {
    const t = useI18n();
    const accessToken = useAccessToken();

    function shareProfile() {
        shareUrl(
            ROUTE.USER.DETAIL.setURL(accessToken?.preferred_username || ''),
            accessToken?.name || '',
            t('profile.share_profile'),
        ).catch((err) => {
            showError(err);
        });
    }

    return (
        <Stack spacing={1} className='px-4'>
            <Box className='w-full'>
                <Typography variant='body2' className='break-all !text-sm'>
                    {profile?.about || t('profile.default_about_section')}
                </Typography>
            </Box>
            {profile?.phone_number && (
                <Link
                    href={`tel:${profile.phone_number}`}
                    underline='hover'
                    className='!text-sm flex gap-1 items-center w-fit'
                >
                    <PhoneAndroidIcon fontSize='small' />
                    <span>{profile.phone_number}</span>
                </Link>
            )}
            {profile?.email && (
                <Link
                    href={`mailto:${profile.email}`}
                    underline='hover'
                    className='!text-sm flex gap-1 items-center w-fit'
                >
                    <EmailIcon fontSize='small' />
                    <span>{profile.email}</span>
                </Link>
            )}
            {profile?.website && (
                <Link
                    href={profile.website}
                    underline='hover'
                    className='!text-sm flex gap-1 items-center w-fit'
                    target='_blank'
                    rel='noopener'
                >
                    <LinkIcon fontSize='small' />
                    <span>{profile.website}</span>
                </Link>
            )}

            {profile && <SocialMedia profile={profile} />}
            <Box className='gap-1 flex self-center'>
                <EditProfile profile={profile} />
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
