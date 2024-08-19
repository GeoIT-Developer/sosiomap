export interface ChatDataInterface {
    _id: string;
    __v: number;
    username: string;
    name: string;
    channel: string;
    body: string;
    distance: number;
    photo_url?: string;
    created_at: string;
    updated_at?: null | string;
    deleted_at?: null | string;

    // This is for the chat window date label
    rootLabelDate?: boolean;
}
