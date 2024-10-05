import { ReactionEnum } from '@/types/reaction.enum';
import { PostStatInterface } from './post-stat.interface';

export interface MapPostDataInterface {
    location: Location;
    _id: string;
    topic_id: string;
    location_type: string;
    body: string;
    post_type: string;
    post_url: PostUrlType;
    media: MediaType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    distance?: number;
    username: string;
    name: string;
    photo_url?: string;
    title?: string;
    start_date?: string;
    end_date?: string;
    date_time?: string;
    stats?: PostStatInterface;
    reaction?: ReactionEnum;
}

interface Location {
    type: string;
    coordinates: number[];
}

export interface PostUrlType {
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    news_website?: string;
    other?: string;
    _id?: string;
}

interface MediaType {
    file_url: string;
    caption?: string;
    _id: string;
}
