export interface ProfileDataInterface {
    last_location?: LastLocation;
    _id: string;
    user_id: string;
    photo?: string;
    cover_photo?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface LastLocation {
    type: string;
    coordinates: any[];
}
