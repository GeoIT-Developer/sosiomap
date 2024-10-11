import { Avatar, IconButton } from '@mui/material';
import { ASSETS } from '@/utils/constant';
import { useEffect, useRef, useState } from 'react';
import { BadgeColor, LIST_BADGE } from '@/utils/badge';
import { Badge } from '@/types/api/responses/profile-data.interface';
import { getDateTimeString } from '@/utils/helper';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';
import { useScopedI18n } from '@/locales/client';

export default function BadgeItem({ badge }: { badge: Badge }) {
    const iconRef = useRef<SVGSVGElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const t = useScopedI18n('badge');

    const eBadge = LIST_BADGE.find((bdg) => bdg.id === badge.badge_id);

    const EIcon = eBadge?.icon;
    const badgeLevel = badge.level;
    const iconColor: { color: string; bgColor: string } | undefined = badgeLevel
        ? // @ts-ignore
          BadgeColor[badgeLevel]
        : undefined;

    const eImage = eBadge?.image;

    const eLevelLabel = badge.level
        ? // @ts-ignore
          ' (' + t(`level.${badge.level}`) + ')'
        : '';
    // @ts-ignore
    const eTitle = t(`name.${eBadge.id}`) + eLevelLabel;
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
            url: eImage || imageUrl || `${ASSETS.BADGE}/default.png`,
            title: eTitle,
            caption: eDate + ' ' + eDesc,
            fileType: 'image/',
        },
    ];

    useEffect(() => {
        if (iconRef.current) {
            // Serialize the SVG element to an XML string
            const svgElement = iconRef.current;
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);

            // Create a Blob from the SVG string
            const blob = new Blob([svgString], { type: 'image/svg+xml' });

            // Create an object URL for the Blob
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [badge, iconRef.current]);

    const iconStyle = {
        color: iconColor?.color || '',
        backgroundColor: iconColor?.bgColor || '',
        borderColor: iconColor?.color || '',
    };

    return (
        <ImageViewer media={eMedia} slideStyles={EIcon ? iconStyle : undefined}>
            <IconButton sx={{ p: '4px' }}>
                {EIcon && (
                    <EIcon
                        ref={iconRef}
                        fontSize='large'
                        sx={{
                            color: iconColor?.color || '',
                            backgroundColor: iconColor?.bgColor || '',
                            borderColor: iconColor?.color || '',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            padding: '2px',
                            width: '38px',
                            height: '38px',
                        }}
                        className='rounded-full'
                    />
                )}
                {eImage && (
                    <Avatar src={eImage} sx={{ border: '1px solid gray' }} />
                )}
            </IconButton>
        </ImageViewer>
    );
}
