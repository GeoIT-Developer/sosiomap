import { Box, Grid, ListItemText } from '@mui/material';
import { useI18n, useScopedI18n } from '@/locales/client';
import { formatDataCount } from '@/utils/helper';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';

export default function MainSection({
    profile,
}: {
    profile: ProfileDataInterface;
}) {
    const t = useI18n();
    const tFormat = useScopedI18n('unit.number');

    const eSummary = profile?.summary;
    function formattingData(count: number | undefined) {
        const eData = formatDataCount(count);
        return `${eData.count}${eData.label ? tFormat(eData.label) : ''}`;
    }

    const listData = [
        {
            total: formattingData(eSummary?.total_posts),
            label: t('profile.posts'),
        },
        {
            total: formattingData(eSummary?.total_followers),
            label: t('profile.followers'),
        },
        {
            total: formattingData(eSummary?.total_following),
            label: t('profile.following'),
        },
        {
            total: formattingData(eSummary?.total_place_following),
            label: t('profile.places'),
        },
    ];

    return (
        <Box className='mt-4 mb-2 flex flex-wrap gap-1 justify-center'>
            <Grid
                container
                spacing={{ xs: 2 }}
                columns={{ xs: 4 }}
                className='px-4'
            >
                {listData.map((item, idx) => {
                    return (
                        <Grid key={idx} item xs={1}>
                            <ListItemText
                                primary={item.total}
                                secondary={item.label}
                                sx={{
                                    textAlign: 'center',
                                }}
                                secondaryTypographyProps={{ fontSize: 'small' }}
                                primaryTypographyProps={{ fontSize: 'large' }}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
