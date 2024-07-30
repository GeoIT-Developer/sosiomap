import { Stack } from '@mui/material';
import AboutSection from './AboutSection';
import AccountSection from './AccountSection';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';

type Props = {
    profile: ProfileDataInterface | undefined | null;
};

export default function DetailTab({ profile }: Props) {
    return (
        <Stack spacing={2} className='py-4'>
            <AboutSection profile={profile} />
            <AccountSection />
        </Stack>
    );
}
