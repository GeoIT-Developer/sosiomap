import {
    Box,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';

import { Fragment, useState } from 'react';
import { ReactionDataType, useListReaction } from '../Action/Reaction';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import { grey } from '@mui/material/colors';
import { useThemeMode } from '@/contexts/ThemeContext';
import { ObjectLiteral } from '@/types/object-literal.interface';
import useFormattingData from '@/hooks/useFormattingData';
import { getValObject } from '@/utils';

type Props = {
    post: MapPostDataInterface;
};
const sortAndFilterZeroKeys = (
    reactions: ObjectLiteral | undefined,
): string[] => {
    if (!reactions) return [];
    const sortedEntries = Object.entries(reactions)
        .filter(([, value]) => value > 0) // Filter out entries with 0 value
        .sort(([, valueA], [, valueB]) => valueB - valueA);

    const sortedKeys = sortedEntries.map(([key]) => key);
    return sortedKeys;
};

const getTopThreeKeys = (reactions: ObjectLiteral | undefined): string[] => {
    const sortedKeys = sortAndFilterZeroKeys(reactions);
    const topThreeKeys = sortedKeys.slice(0, 3);
    return topThreeKeys;
};

function sortedListReactions(list: ReactionDataType[], keys: string[]) {
    const eReactions = list.filter((item) => keys.includes(item.id));
    return eReactions;
}

export default function DetailStats({ post }: Props) {
    const t = useScopedI18n('post.statistic');
    const { mode } = useThemeMode();
    const paperColor = mode === 'dark' ? grey[800] : '#fff';
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { stats } = post;
    const listReaction = useListReaction('all');
    const topThreeReactions = sortedListReactions(
        listReaction,
        getTopThreeKeys(stats?.reactions),
    );
    const sortedReactions = sortedListReactions(
        listReaction,
        sortAndFilterZeroKeys(stats?.reactions),
    );

    const { formattingData } = useFormattingData();
    // @ts-ignore
    const viewValue = t('views', { value: formattingData(stats?.views) });
    // @ts-ignore
    const uniqueViewValue = t('unique_views', {
        value: formattingData(stats?.unique_views),
    });

    return (
        <Box className='flex justify-between items-center'>
            <Stack
                direction='row'
                className='cursor-pointer'
                onClick={handleAnchorClick}
            >
                {topThreeReactions.map((item, idx) => {
                    return (
                        <Fragment key={idx}>
                            {item.format === 'image' && (
                                <MyImage
                                    src={`${ASSETS.REACTION}${item.id}.png`}
                                    height={24}
                                    width={24}
                                    alt={item.label}
                                    className={`${
                                        idx === 0 ? '' : '-ml-2'
                                    } rounded-full p-0.5`}
                                    style={{
                                        zIndex: topThreeReactions.length - idx,
                                        backgroundColor: paperColor,
                                    }}
                                />
                            )}
                            {item.format === 'text' && (
                                <span
                                    className={`${
                                        idx === 0 ? '' : '-ml-2'
                                    } !font-pacifico text-xs rounded-full p-0.5`}
                                    style={{
                                        color: 'orange',
                                        zIndex: topThreeReactions.length - idx,
                                        backgroundColor: paperColor,
                                    }}
                                >
                                    {item.label}
                                </span>
                            )}
                        </Fragment>
                    );
                })}
            </Stack>

            <Typography component='p' variant='caption' sx={{ opacity: 0.7 }}>
                {`${viewValue} | ${uniqueViewValue}`}
            </Typography>

            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                    className: '!py-0',
                }}
            >
                {sortedReactions.map((item) => {
                    return (
                        <MenuItem
                            key={item.id}
                            dense
                            sx={{ alignItems: 'end', px: '12px' }}
                        >
                            {item.format === 'image' && (
                                <>
                                    <ListItemIcon>
                                        <MyImage
                                            src={`${ASSETS.REACTION}${item.id}.png`}
                                            height={24}
                                            width={24}
                                            alt={item.label}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>{item.label}</ListItemText>
                                </>
                            )}
                            {item.format === 'text' && (
                                <ListItemText className='w-full text-center'>
                                    <span className='!font-pacifico'>
                                        {item.label}
                                    </span>
                                </ListItemText>
                            )}
                            <Typography
                                variant='body2'
                                sx={{
                                    color: 'orange',
                                    marginLeft: '1rem',
                                }}
                            >
                                {getValObject(stats?.reactions, item.id, 0)}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );
}
