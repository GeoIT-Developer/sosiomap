import { Avatar, Box, IconButton } from '@mui/material';
import { ASSETS } from '@/utils/constant';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../Content';
import { LIST_BADGE } from '@/utils/badge';
import { Badge } from '@/types/api/responses/profile-data.interface';
import { sortByKey } from '@/utils';
import { getLatestBadges } from '@/utils/helper';

export default function BadgeSection() {
    const { profile } = useContext(ProfileContext);
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
            {badges.map((badge, idx) => {
                const eBadge = LIST_BADGE.find(
                    (bdg) => bdg.id === badge.badge_id,
                );

                return (
                    <IconButton key={idx} sx={{ p: '4px' }}>
                        <Avatar
                            src={eBadge?.image || `${ASSETS.BADGE}/default.png`}
                            sx={{ border: '1px solid gray' }}
                        />
                    </IconButton>
                );
            })}
        </Box>
    );
}
