export interface ProfileDataInterface {
    id: string;
    name: string;
    username: string;

    // User but optional
    email?: string;
    emailConstraint?: string;
    emailVerified?: boolean;
    enabled?: boolean;
    firstName?: string;
    lastName?: string;
    realmId?: string;
    createdTimestamp?: number;

    // Profile
    photo?: string;
    cover_photo?: string;
    profile?: Omit<ProfileInterface, 'photo' | 'cover_photo'>;
    summary?: ProfileStat;
    badge?: ProfileBadge;
}

export interface ProfileInterface {
    _id: string;
    user_id: string;
    photo?: string;
    cover_photo?: string;
    about?: string;
    website?: string;
    email?: string;
    phone_number?: string;
    social_media?: ProfileSocialMediaInterface;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProfileSocialMediaInterface {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
    linkedin?: string;
    whatsapp?: string;
    telegram?: string;
    discord?: string;
    github?: string;
    spotify?: string;
    pinterest?: string;
    reddit?: string;
}

export interface ProfileStat {
    user_id: string;

    // General Activity
    total_posts?: number;
    total_comments?: number;
    total_post_views?: number;
    total_chats_sent?: number;
    total_app_opens_daily?: number;
    streak_daily_app_opens?: number;
    total_viewing_posts?: number;
    total_screen_time?: number;

    // Reactions Given
    total_positive_reactions_given?: number;
    total_thank_you_reactions_given?: number;
    total_negative_reactions_given?: number;
    total_misleading_reactions_given?: number;

    // Reactions Received
    total_positive_reactions_received?: number;
    total_thank_you_reactions_received?: number;
    total_negative_reactions_received?: number;
    total_misleading_reactions_received?: number;

    // Social Interactions
    total_followers?: number;
    total_following?: number;
    total_place_following?: number;
    total_profile_views?: number;

    // Category-Specific Stats
    news_posts?: number;
    news_interactions?: number;
    event_posts?: number;
    event_interactions?: number;
    tourism_posts?: number;
    tourism_interactions?: number;
    user_stories_posts?: number;
    user_stories_interactions?: number;
    traffic_posts?: number;
    traffic_interactions?: number;
    environment_posts?: number;
    environment_interactions?: number;
    disaster_posts?: number;
    disaster_interactions?: number;
    social_posts?: number;
    social_interactions?: number;
    marketplace_posts?: number;
    marketplace_interactions?: number;
    promo_posts?: number;
    promo_interactions?: number;
    qa_posts?: number;
    qa_interactions?: number;
    open_topic_created?: number;
    open_topic_posts?: number;
    open_topic_subscriptions?: number;
    open_topic_interactions?: number;
}

export interface Badge {
    // The badge type or identifier
    badge_id: string;

    // The date when the badge was earned
    date_earned: string;

    // The value that was achieved to earn the badge (e.g., number of posts)
    achievement_value?: number;

    // The level of the badge (e.g., bronze, silver, gold)
    level?: string;

    // Description of the badge
    description?: string;

    // Optional: The context or source of the badge, if needed
    source?: string;

    // Indicates the status of the badge
    status?: 'active' | 'revoked';
}

export interface ProfileBadge {
    user_id: string;

    badges: Badge[];

    deletedAt?: Date | null;
}
