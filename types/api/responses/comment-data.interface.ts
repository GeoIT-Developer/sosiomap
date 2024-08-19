export interface CommentDataInterface {
    _id: string;
    post_id: string;
    body: string;
    post_url: PostUrlType;
    media: MediaType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    distance: number;
    username: string;
    name: string;
    photo_url?: string;
    title?: string;
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
