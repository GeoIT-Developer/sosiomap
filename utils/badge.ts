import { ASSETS } from './constant';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import RecordVoiceOverTwoToneIcon from '@mui/icons-material/RecordVoiceOverTwoTone';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import FreeBreakfastTwoToneIcon from '@mui/icons-material/FreeBreakfastTwoTone';
import Face2TwoToneIcon from '@mui/icons-material/Face2TwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import FaceRetouchingNaturalTwoToneIcon from '@mui/icons-material/FaceRetouchingNaturalTwoTone';
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import FeedTwoToneIcon from '@mui/icons-material/FeedTwoTone';
import NewspaperTwoToneIcon from '@mui/icons-material/NewspaperTwoTone';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AirplanemodeActiveTwoToneIcon from '@mui/icons-material/AirplanemodeActiveTwoTone';
import AirplaneTicketTwoToneIcon from '@mui/icons-material/AirplaneTicketTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import GradeTwoToneIcon from '@mui/icons-material/GradeTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import DirectionsTwoToneIcon from '@mui/icons-material/DirectionsTwoTone';
import ForestTwoToneIcon from '@mui/icons-material/ForestTwoTone';
import EnergySavingsLeafTwoToneIcon from '@mui/icons-material/EnergySavingsLeafTwoTone';
import FloodTwoToneIcon from '@mui/icons-material/FloodTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import DiscountTwoToneIcon from '@mui/icons-material/DiscountTwoTone';
import LocalOfferTwoToneIcon from '@mui/icons-material/LocalOfferTwoTone';
import LiveHelpTwoToneIcon from '@mui/icons-material/LiveHelpTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import GroupWorkTwoToneIcon from '@mui/icons-material/GroupWorkTwoTone';
import SubscriptionsTwoToneIcon from '@mui/icons-material/SubscriptionsTwoTone';

export const BadgeColor = {
    bronze: {
        bgColor: '#CD7F32',
        color: '#8B4513',
    },
    silver: {
        bgColor: '#C0C0C0',
        color: '#4682B4',
    },
    gold: {
        bgColor: '#FFD700',
        color: '#B8860B',
    },
    platinum: {
        bgColor: '#E5E4E2',
        color: '#708090',
    },
    diamond: {
        bgColor: '#B9F2FF',
        color: '#1E90FF',
    },
};

export type BadgeInterface = {
    id: string;
    description: string;
    level?: {
        name: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
        value: number;
    }[];
    type: 'common' | 'special' | 'time-limited';
    image?: string;
    icon?: typeof DrawTwoToneIcon;
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
        icon: DrawTwoToneIcon,
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
        icon: ForumTwoToneIcon,
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
        icon: TrendingUpTwoToneIcon,
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
        icon: RecordVoiceOverTwoToneIcon,
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
        icon: TodayTwoToneIcon,
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
        icon: CalendarTodayTwoToneIcon,
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
        icon: VisibilityTwoToneIcon,
    },
    NO_LIFE: {
        id: 'no-life',
        description: 'Total Screen time',
        level: [
            { name: 'bronze', value: 10 },
            { name: 'silver', value: 50 },
            { name: 'gold', value: 100 },
            { name: 'platinum', value: 250 },
            { name: 'diamond', value: 500 },
        ],
        type: 'common',
        icon: FreeBreakfastTwoToneIcon,
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
        icon: Face2TwoToneIcon,
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
        icon: GroupAddTwoToneIcon,
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
        icon: FaceRetouchingNaturalTwoToneIcon,
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
        icon: PlaceTwoToneIcon,
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
        icon: ThumbUpAltTwoToneIcon,
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
        icon: FavoriteTwoToneIcon,
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
        icon: EmojiEmotionsTwoToneIcon,
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
        icon: AddReactionTwoToneIcon,
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
        icon: ThumbDownAltTwoToneIcon,
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
        icon: FlagTwoToneIcon,
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
        icon: FeedbackTwoToneIcon,
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
        icon: ReportTwoToneIcon,
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
        icon: FeedTwoToneIcon,
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
        icon: NewspaperTwoToneIcon,
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
        icon: CelebrationTwoToneIcon,
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
        icon: EventAvailableTwoToneIcon,
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
        icon: AirplanemodeActiveTwoToneIcon,
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
        icon: AirplaneTicketTwoToneIcon,
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
        icon: LocalActivityTwoToneIcon,
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
        icon: GradeTwoToneIcon,
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
        icon: TrafficTwoToneIcon,
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
        icon: DirectionsTwoToneIcon,
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
        icon: ForestTwoToneIcon,
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
        icon: EnergySavingsLeafTwoToneIcon,
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
        icon: FloodTwoToneIcon,
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
        icon: SupportTwoToneIcon,
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
        icon: VolunteerActivismTwoToneIcon,
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
        icon: Diversity3TwoToneIcon,
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
        icon: StoreTwoToneIcon,
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
        icon: LocalGroceryStoreTwoToneIcon,
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
        icon: DiscountTwoToneIcon,
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
        icon: LocalOfferTwoToneIcon,
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
        icon: LiveHelpTwoToneIcon,
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
        icon: InfoTwoToneIcon,
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
        icon: CreateNewFolderTwoToneIcon,
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
        icon: PostAddTwoToneIcon,
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
        icon: GroupWorkTwoToneIcon,
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
        icon: SubscriptionsTwoToneIcon,
    },
};

export const SPECIAL_BADGE: { [key: string]: BadgeInterface } = {
    EARLY_ADOPTER: {
        id: 'early-adopter',
        description: 'For users who created an account before August 17, 2024',
        type: 'time-limited',
        image: `${ASSETS.BADGE}/early-adopter.png`,
    },
    BETA_TESTER: {
        id: 'beta-tester',
        description:
            'For users who were active or logged in between August 17, 2024, and December 31, 2024',
        type: 'time-limited',
        image: `${ASSETS.BADGE}/beta-tester.png`,
    },
};

export const LIST_COMMON_BADGE = Object.values(BADGE);

export const LIST_SPECIAL_BADGE = Object.values(SPECIAL_BADGE);

export const LIST_BADGE = [...LIST_COMMON_BADGE, ...LIST_SPECIAL_BADGE];
