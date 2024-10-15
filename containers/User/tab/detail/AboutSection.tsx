import { Box, Link, Stack, Typography } from '@mui/material';
import { useI18n } from '@/locales/client';
import LinkIcon from '@mui/icons-material/Link';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import SocialMedia from '@/containers/ProfilePage/tab/detail/SocialMedia';

export default function AboutSection({
    profile,
}: {
    profile: ProfileDataInterface;
}) {
    const t = useI18n();

    const eProfile = profile?.profile;

    return (
        <Stack spacing={1} className='px-4'>
            <Box className='w-full'>
                <Typography
                    variant='body2'
                    className='!text-sm whitespace-break-spaces'
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
        </Stack>
    );
}
