import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { formatReadableNumber } from '@/utils/helper';
import { useScopedI18n } from '@/locales/client';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';

export default function DetailSection({
    profile,
}: {
    profile: ProfileDataInterface;
}) {
    const t = useScopedI18n('profile.summary');

    const eSummary = profile?.summary;

    const listSummary: {
        total: string;
        label: string;
        description?: string;
    }[][] = [
        [
            {
                total: formatReadableNumber(eSummary?.total_followers),
                label: t('total_followers'),
            },
            {
                total: formatReadableNumber(eSummary?.total_following),
                label: t('total_following'),
            },
            {
                total: formatReadableNumber(eSummary?.total_place_following),
                label: t('total_place_following'),
            },
            {
                total: formatReadableNumber(eSummary?.total_profile_views),
                label: t('total_profile_views'),
            },
            {
                total: formatReadableNumber(eSummary?.total_posts),
                label: t('total_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.total_comments),
                label: t('total_comments'),
            },
            {
                total: formatReadableNumber(eSummary?.total_post_views),
                label: t('total_post_views'),
            },
            {
                total: formatReadableNumber(eSummary?.total_viewing_posts),
                label: t('total_viewing_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.total_chats_sent),
                label: t('total_chats_sent'),
            },
            {
                total: formatReadableNumber(eSummary?.total_app_opens_daily),
                label: t('total_app_opens_daily'),
            },
            {
                total: formatReadableNumber(eSummary?.streak_daily_app_opens),
                label: t('streak_daily_app_opens'),
            },
            {
                total: formatReadableNumber(eSummary?.total_screen_time),
                label: t('total_screen_time'),
            },
        ],
        [
            {
                total: formatReadableNumber(
                    eSummary?.total_positive_reactions_given,
                ),
                label: t('total_positive_reactions_given'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_positive_reactions_received,
                ),
                label: t('total_positive_reactions_received'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_thank_you_reactions_given,
                ),
                label: t('total_thank_you_reactions_given'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_thank_you_reactions_received,
                ),
                label: t('total_thank_you_reactions_received'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_negative_reactions_given,
                ),
                label: t('total_negative_reactions_given'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_negative_reactions_received,
                ),
                label: t('total_negative_reactions_received'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_misleading_reactions_given,
                ),
                label: t('total_misleading_reactions_given'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.total_misleading_reactions_received,
                ),
                label: t('total_misleading_reactions_received'),
            },
        ],
        [
            {
                total: formatReadableNumber(eSummary?.news_posts),
                label: t('news_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.news_interactions),
                label: t('news_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.event_posts),
                label: t('event_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.event_interactions),
                label: t('event_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.tourism_posts),
                label: t('tourism_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.tourism_interactions),
                label: t('tourism_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.user_stories_posts),
                label: t('user_stories_posts'),
            },
            {
                total: formatReadableNumber(
                    eSummary?.user_stories_interactions,
                ),
                label: t('user_stories_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.traffic_posts),
                label: t('traffic_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.traffic_interactions),
                label: t('traffic_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.environment_posts),
                label: t('environment_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.environment_interactions),
                label: t('environment_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.disaster_posts),
                label: t('disaster_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.disaster_interactions),
                label: t('disaster_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.social_posts),
                label: t('social_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.social_interactions),
                label: t('social_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.marketplace_posts),
                label: t('marketplace_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.marketplace_interactions),
                label: t('marketplace_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.promo_posts),
                label: t('promo_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.promo_interactions),
                label: t('promo_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.qa_posts),
                label: t('qa_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.qa_interactions),
                label: t('qa_interactions'),
            },
            {
                total: formatReadableNumber(eSummary?.open_topic_created),
                label: t('open_topic_created'),
            },
            {
                total: formatReadableNumber(eSummary?.open_topic_posts),
                label: t('open_topic_posts'),
            },
            {
                total: formatReadableNumber(eSummary?.open_topic_subscriptions),
                label: t('open_topic_subscriptions'),
            },
            {
                total: formatReadableNumber(eSummary?.open_topic_interactions),
                label: t('open_topic_interactions'),
            },
        ],
    ];

    return (
        <Paper>
            {listSummary.map((section, idx) => {
                return (
                    <List key={idx} dense>
                        {section.map((item, idy) => {
                            return (
                                <ListItem
                                    key={idy}
                                    secondaryAction={
                                        <Typography
                                            variant='body2'
                                            sx={{ fontSize: 'small' }}
                                        >
                                            {item.total}
                                        </Typography>
                                    }
                                    sx={{ paddingY: 0 }}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        secondary={item.description}
                                        primaryTypographyProps={{
                                            fontSize: 'small',
                                        }}
                                        secondaryTypographyProps={{
                                            fontSize: 'x-small',
                                        }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                );
            })}
        </Paper>
    );
}
