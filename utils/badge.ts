import { ASSETS } from './constant';

export type BadgeInterface = {
    id: string;
    description: string;
    level?: {
        name: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
        value: number;
    }[];
    type: 'common' | 'special' | 'time-limited';
    image?: string;
};

export const BADGE: { [key: string]: BadgeInterface } = {
    CONTENT_CREATOR: {
        id: 'content-creator',
        description: 'For a high total number of posts',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    COMMENTATOR: {
        id: 'commentator',
        description: 'For a high total number of comments',
        level: [
            { name: 'bronze', value: 25 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    TRENDSETTER: {
        id: 'trendsetter',
        description: 'For a high total number of views on posts you created',
        level: [
            { name: 'bronze', value: 500 },
            { name: 'silver', value: 2000 },
            { name: 'gold', value: 5000 },
            { name: 'platinum', value: 10000 },
            { name: 'diamond', value: 20000 },
        ],
        type: 'common',
    },
    CHATTY: {
        id: 'chatty',
        description: 'For sending a high number of chats',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    VISITOR: {
        id: 'visitor',
        description: 'For consistently opening the app daily',
        level: [
            { name: 'bronze', value: 14 },
            { name: 'silver', value: 60 },
            { name: 'gold', value: 180 },
            { name: 'platinum', value: 365 },
            { name: 'diamond', value: 730 },
        ],
        type: 'common',
    },
    DEDICATED: {
        id: 'dedicated',
        description: 'For consistently opening the app daily (streaks)',
        level: [
            { name: 'bronze', value: 14 },
            { name: 'silver', value: 30 },
            { name: 'gold', value: 60 },
            { name: 'platinum', value: 120 },
            { name: 'diamond', value: 365 },
        ],
        type: 'common',
    },
    CURIOUS: {
        id: 'curious',
        description: 'For viewing a high number of posts',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    NO_LIFE: {
        id: 'no-life',
        description: 'TotalPosts',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    INFLUENCER: {
        id: 'influencer',
        description: 'For having a high number of followers',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    CONNECTOR: {
        id: 'connector',
        description: 'For following a high number of users',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    POPULAR: {
        id: 'popular',
        description: 'For having a high number of profile views',
        level: [
            { name: 'bronze', value: 500 },
            { name: 'silver', value: 2000 },
            { name: 'gold', value: 5000 },
            { name: 'platinum', value: 10000 },
            { name: 'diamond', value: 20000 },
        ],
        type: 'common',
    },
    WAYFARER: {
        id: 'wayfarer',
        description: 'For following places',
        level: [
            { name: 'bronze', value: 5 },
            { name: 'silver', value: 10 },
            { name: 'gold', value: 25 },
            { name: 'platinum', value: 50 },
            { name: 'diamond', value: 100 },
        ],
        type: 'common',
    },
    INSPIRATOR: {
        id: 'inspirator',
        description: 'For receiving a high number of positive reactions',
        level: [
            { name: 'bronze', value: 50 },
            { name: 'silver', value: 200 },
            { name: 'gold', value: 500 },
            { name: 'platinum', value: 1000 },
            { name: 'diamond', value: 2000 },
        ],
        type: 'common',
    },
    ENCOURAGER: {
        id: 'encourager',
        description: 'For giving a high number of positive reactions',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    HONORED: {
        id: 'honored',
        description: 'For receiving a high number of thank you reactions',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    APPRECIATOR: {
        id: 'appreciator',
        description: 'For giving a high number of thank you reactions',
        level: [
            { name: 'bronze', value: 50 },
            { name: 'silver', value: 200 },
            { name: 'gold', value: 500 },
            { name: 'platinum', value: 1000 },
            { name: 'diamond', value: 2000 },
        ],
        type: 'common',
    },
    CONTROVERSIAL: {
        id: 'controversial',
        description: 'For receiving a high number of negative reactions',
        level: [
            { name: 'bronze', value: 50 },
            { name: 'silver', value: 200 },
            { name: 'gold', value: 500 },
            { name: 'platinum', value: 1000 },
            { name: 'diamond', value: 2000 },
        ],
        type: 'common',
    },
    PROVOCATOR: {
        id: 'provocator',
        description: 'For receiving a high number of misleading reactions',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    CRITIQUE: {
        id: 'critique',
        description: 'For giving a high number of negative reactions',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    DEBUNKER: {
        id: 'debunker',
        description: 'For giving a high number of misleading reactions',
        level: [
            { name: 'bronze', value: 50 },
            { name: 'silver', value: 200 },
            { name: 'gold', value: 500 },
            { name: 'platinum', value: 1000 },
            { name: 'diamond', value: 2000 },
        ],
        type: 'common',
    },
    JOURNALIST: {
        id: 'journalist',
        description: 'For a high number of posts in the "news" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    HEADLINE_FAN: {
        id: 'headline-fan',
        description: 'For a high number of interactions in the "news" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    ORGANIZER: {
        id: 'organizer',
        description: 'For a high number of posts in the "event" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    EVENT_ENTHUSIAST: {
        id: 'event-enthusiast',
        description:
            'For a high number of interactions in the "event" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    TOUR_GUIDE: {
        id: 'tour-guide',
        description: 'For a high number of posts in the "tourism" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    TRAVELER: {
        id: 'traveler',
        description:
            'For a high number of interactions in the "tourism" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    STORY_TELLER: {
        id: 'story-teller',
        description:
            'For a high number of posts in the "user stories" category',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
    STORY_LOVER: {
        id: 'story-lover',
        description:
            'For a high number of interactions in the "user stories" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    TRAFFIC_REPORTER: {
        id: 'traffic-reporter',
        description: 'For a high number of posts in the "traffic" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    TRAFFIC_WATCHER: {
        id: 'traffic-watcher',
        description:
            'For a high number of interactions in the "traffic" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    ECO_WARRIOR: {
        id: 'eco-warrior',
        description: 'For a high number of posts in the "environment" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    ECO_ADVOCATE: {
        id: 'eco-advocate',
        description:
            'For a high number of interactions in the "environment" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    DISASTER_REPORTER: {
        id: 'disaster-reporter',
        description: 'For a high number of posts in the "disaster" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    DISASTER_RESPONDER: {
        id: 'disaster-responder',
        description:
            'For a high number of interactions in the "disaster" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    COMMUNITY_BUILDER: {
        id: 'community-builder',
        description: 'For a high number of posts in the "Social" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    SOCIAL_BUTTERFLY: {
        id: 'social-butterfly',
        description:
            'For a high number of interactions in the "Social" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    TRADER: {
        id: 'trader',
        description: 'For a high number of posts in the "marketplace" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    SHOPPER: {
        id: 'shopper',
        description:
            'For a high number of interactions in the "marketplace" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    PROMOTER: {
        id: 'promoter',
        description: 'For a high number of posts in the "Promo" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    PROMO_HUNTER: {
        id: 'promo-hunter',
        description:
            'For a high number of interactions in the "Promo" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    KNOWLEDGE_SEEKER: {
        id: 'knowledge-seeker',
        description: 'For a high number of posts in the "Q&A" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    KNOWLEDGE_SHARER: {
        id: 'knowledge-sharer',
        description: 'For a high number of interactions in the "Q&A" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    INITIATOR: {
        id: 'initiator',
        description: 'For creating many topics in the "Open Topic" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    CONTRIBUTOR: {
        id: 'contributor',
        description: 'For a high number of posts in the "Open Topic" category',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
    },
    DISCUSSION_LEADER: {
        id: 'discussion-leader',
        description:
            'For a high number of interactions in the "Open Topic" category',
        level: [
            { name: 'bronze', value: 100 },
            { name: 'silver', value: 500 },
            { name: 'gold', value: 1000 },
            { name: 'platinum', value: 2500 },
            { name: 'diamond', value: 5000 },
        ],
        type: 'common',
    },
    STAY_UPDATED: {
        id: 'stay-updated',
        description:
            'For how many topics subscribed in the "Open Topic" category',
        level: [
            { name: 'bronze', value: 20 },
            { name: 'silver', value: 100 },
            { name: 'gold', value: 250 },
            { name: 'platinum', value: 500 },
            { name: 'diamond', value: 1000 },
        ],
        type: 'common',
    },
};

export const SPECIAL_BADGE: { [key: string]: BadgeInterface } = {
    EARLY_ADOPTER: {
        id: 'early-adopter',
        description: 'For users who created an account before August 17, 2024',
        type: 'time-limited',
        image: `${ASSETS.BADGE}/early-adopter.jpeg`,
    },
    BETA_TESTER: {
        id: 'beta-tester',
        description:
            'For users who were active or logged in between August 17, 2024, and December 31, 2024',
        type: 'time-limited',
        image: `${ASSETS.BADGE}/beta-tester.jpeg`,
    },
};

export const LIST_COMMON_BADGE = Object.values(BADGE);

export const LIST_SPECIAL_BADGE = Object.values(SPECIAL_BADGE);

export const LIST_BADGE = [...LIST_COMMON_BADGE, ...LIST_SPECIAL_BADGE];
