import { Divider, Stack } from '@mui/material';
import BadgeSection from './BadgeSection';
import DetailSection from './DetailSection';
import MainSection from './MainSection';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';

export default function SummaryTab({
    profile,
}: {
    profile: ProfileDataInterface;
}) {
    return (
        <Stack spacing={2} className='py-4'>
            <MainSection profile={profile} />
            {Boolean(profile?.badge?.badges.length) && (
                <>
                    <Divider />
                    <BadgeSection profile={profile} />
                </>
            )}
            <Divider />
            <DetailSection profile={profile} />
        </Stack>
    );
}
