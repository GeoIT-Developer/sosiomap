export interface ProfileDataInterface {
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
