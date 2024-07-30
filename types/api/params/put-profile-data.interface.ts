import ChooseLocationEnum from '@/types/choose-location.enum';
import PostTypeEnum from '@/types/post-type.enum';
import { ProfileSocialMediaInterface } from '../responses/profile-data.interface';

export interface PutProfileDataParamsInterface
    extends ProfileSocialMediaInterface {
    about: string;
    email: string;
    website: string;
    phone_number: string;
}
