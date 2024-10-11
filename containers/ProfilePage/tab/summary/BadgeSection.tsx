import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    Badge,
    ProfileDataInterface,
} from '@/types/api/responses/profile-data.interface';
import { sortByKey } from '@/utils';
import { getLatestBadges } from '@/utils/helper';
import BadgeItem from './BadgeItem';

export default function BadgeSection({
    profile,
}: {
    profile: ProfileDataInterface;
}) {
    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
        const eBadges = profile?.badge?.badges || [];
        if (eBadges.length > 0) {
            const cleaning = getLatestBadges(eBadges);
            const sorting = sortByKey(cleaning, 'date_earned', 'desc');
            setBadges(sorting);
        }
    }, [profile?.badge?.badges]);

    return (
        <Box className='mt-4 mb-2 flex flex-wrap gap-1 justify-center'>
            {badges.map((item, idx) => (
                <BadgeItem key={idx} badge={item} />
            ))}
        </Box>
    );
}
