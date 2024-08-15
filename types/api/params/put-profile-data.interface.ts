import { ProfileSocialMediaInterface } from '../responses/profile-data.interface';

export interface PutProfileDataParamsInterface
    extends ProfileSocialMediaInterface {
    about: string;
    email: string;
    website: string;
    phone_number: string;
}
