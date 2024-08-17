import { Avatar, Box, IconButton } from '@mui/material';
import { ASSETS } from '@/utils/constant';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../Content';
import { LIST_BADGE } from '@/utils/badge';
import { Badge } from '@/types/api/responses/profile-data.interface';
import { sortByKey } from '@/utils';
import {
    getDateTimeString,
    getFileExtensionFromUrl,
    getLatestBadges,
    getMimeTypeFromURL,
} from '@/utils/helper';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';
import { useScopedI18n } from '@/locales/client';

export default function BadgeSection() {
    const { profile } = useContext(ProfileContext);
    const [badges, setBadges] = useState<Badge[]>([]);
    const t = useScopedI18n('badge');

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

                const eImage = eBadge?.image || `${ASSETS.BADGE}/default.png`;

                const eLevel = badge.level
                    ? // @ts-ignore
                      ' (' + t(`level.${badge.level}`) + ')'
                    : '';
                // @ts-ignore
                const eTitle = t(`name.${eBadge.id}`) + eLevel;
                // @ts-ignore
                const eDesc = t(`description.${eBadge.id}`, {
                    value: badge.achievement_value,
                });
                // @ts-ignore
                const eDate = t('earned-on', {
                    date: getDateTimeString(badge.date_earned),
                });

                const eMedia: MediaType[] = [
                    {
                        url: eImage,
                        title: eTitle,
                        caption: eDate + ' ' + eDesc,
                        fileType: getMimeTypeFromURL(eImage),
                    },
                ];

                return (
                    <ImageViewer key={idx} media={eMedia}>
                        <IconButton sx={{ p: '4px' }}>
                            <Avatar
                                src={eImage}
                                sx={{ border: '1px solid gray' }}
                            />
                        </IconButton>
                    </ImageViewer>
                );
            })}
        </Box>
    );
}
