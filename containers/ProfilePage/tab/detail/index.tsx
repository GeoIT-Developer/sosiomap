import { Stack } from '@mui/material';
import AboutSection from './AboutSection';
import AccountSection from './AccountSection';

export default function DetailTab() {
    return (
        <Stack spacing={2} className='py-4'>
            <AboutSection />
            <AccountSection />
        </Stack>
    );
}
