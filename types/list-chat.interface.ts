export interface ListChatInterface {
    _id: string;
    __v: number;
    user_id: string;
    username: string;
    name: string;
    channel: string;
    body: string;
    location: LocationChatInterface;
    created_at: string;
    updated_at?: null | string;
    deleted_at?: null | string;
}

export interface LocationChatInterface {
    type: string;
    coordinates: [number, number];
}
