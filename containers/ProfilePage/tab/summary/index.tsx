import { Divider, Stack } from '@mui/material';
import BadgeSection from './BadgeSection';
import DetailSection from './DetailSection';
import MainSection from './MainSection';
import { useContext } from 'react';
import { ProfileContext } from '../../Content';

export default function SummaryTab() {
    const { profile } = useContext(ProfileContext);

    return (
        <Stack spacing={2} className='py-4'>
            <MainSection />
            {Boolean(profile?.badge?.badges.length) && (
                <>
                    <Divider />
                    <BadgeSection />
                </>
            )}
            <Divider />
            <DetailSection />
        </Stack>
    );
}
