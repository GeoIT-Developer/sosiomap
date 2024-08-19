import { Stack } from '@mui/material';
import AboutSection from './AboutSection';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';

export default function DetailTab({
    profile,
}: {
    profile: ProfileDataInterface;
}) {
    return (
        <Stack spacing={2} className='py-4'>
            <AboutSection profile={profile} />
        </Stack>
    );
}
