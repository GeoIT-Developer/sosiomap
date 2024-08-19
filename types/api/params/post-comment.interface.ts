export interface PostCommentParamsInterface {
    post_id: string;
    topic_id?: string;
    title?: string;
    body: string;
    url_instagram_post?: string;
    url_tiktok_post?: string;
    url_twitter_post?: string;
    url_facebook_post?: string;
    url_youtube_post?: string;
    url_linkedin_post?: string;
    url_news_website_post?: string;
    url_other?: string;
    media_1?: File;
    media_2?: File;
    media_3?: File;
    media_4?: File;
    media_1_caption?: string;
    media_2_caption?: string;
    media_3_caption?: string;
    media_4_caption?: string;
}
