import {
    Alert,
    Box,
    Button,
    InputLabel,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { MAX_LENGTH, SOCIAL_MEDIA } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import { isObjectHasValues, showError } from '@/utils';
import FullScreenDialog from '@/components/dialog/FullScreenDialog';
import { useContext, useEffect, useState } from 'react';
import SingleAccordion from '@/components/accordion/SingleAccordion';
import TagIcon from '@mui/icons-material/Tag';
import {
    isValidEmail,
    isValidPhoneNumber,
    isValidURL,
    isValidUsername,
} from '@/utils/helper';
import { PutProfileDataParamsInterface } from '@/types/api/params/put-profile-data.interface';
import API from '@/configs/api';
import useAPI from '@/hooks/useAPI';
import { toast } from 'react-toastify';
import { RefreshContext } from '../../Content';

type Props = {
    profile: ProfileDataInterface | undefined | null;
};

type InputEditProfileInterface = PutProfileDataParamsInterface;

const initialProfileData: InputEditProfileInterface = {
    about: '',
    email: '',
    website: '',
    phone_number: '',
    instagram: '',
    facebook: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
    whatsapp: '',
    telegram: '',
    discord: '',
    github: '',
    spotify: '',
    pinterest: '',
    reddit: '',
};

const {
    getDiscordUrl,
    getFacebookUrl,
    getGithubUrl,
    getWhatsappUrl,
    getInstagramUrl,
    getLinkedinUrl,
    getPinterestUrl,
    getRedditUrl,
    getTelegramUrl,
    getTiktokUrl,
    getTwitterUrl,
    getYouTubeUrl,
    getSpotifyUrl,
} = SOCIAL_MEDIA;

const { PROFILE: MaxLength } = MAX_LENGTH;

function HelperLink({ url }: { url: string }) {
    if (!url) return undefined;
    return (
        <Link href={url} target='_blank' rel='noopener'>
            {url}
        </Link>
    );
}

export default function EditProfile({ profile }: Props) {
    const t = useI18n();
    const { setRefresh } = useContext(RefreshContext);

    const [inputData, setInputData] =
        useState<InputEditProfileInterface>(initialProfileData);

    const { data: profileData, ...apiPutProfile } = useAPI<
        ProfileDataInterface,
        PutProfileDataParamsInterface
    >(API.putProfileData);

    useEffect(() => {
        if (!profile?.user_id) return;

        setInputData({
            about: profile.about || '',
            email: profile.email || '',
            website: profile.website || '',
            phone_number: profile.phone_number || '',
            instagram: profile.social_media?.instagram || '',
            facebook: profile.social_media?.facebook || '',
            twitter: profile.social_media?.twitter || '',
            tiktok: profile.social_media?.tiktok || '',
            youtube: profile.social_media?.youtube || '',
            linkedin: profile.social_media?.linkedin || '',
            whatsapp: profile.social_media?.whatsapp || '',
            telegram: profile.social_media?.telegram || '',
            discord: profile.social_media?.discord || '',
            github: profile.social_media?.github || '',
            spotify: profile.social_media?.spotify || '',
            pinterest: profile.social_media?.pinterest || '',
            reddit: profile.social_media?.reddit || '',
        });
    }, [profile]);

    const socialMediaUrls = {
        instagram: inputData.instagram
            ? getInstagramUrl(inputData.instagram)
            : '',
        facebook: inputData.facebook ? getFacebookUrl(inputData.facebook) : '',
        twitter: inputData.twitter ? getTwitterUrl(inputData.twitter) : '',
        tiktok: inputData.tiktok ? getTiktokUrl(inputData.tiktok) : '',
        youtube: inputData.youtube ? getYouTubeUrl(inputData.youtube) : '',
        linkedin: inputData.linkedin ? getLinkedinUrl(inputData.linkedin) : '',
        whatsapp: inputData.whatsapp ? getWhatsappUrl(inputData.whatsapp) : '',
        telegram: inputData.telegram ? getTelegramUrl(inputData.telegram) : '',
        discord: inputData.discord ? getDiscordUrl(inputData.discord) : '',
        github: inputData.github ? getGithubUrl(inputData.github) : '',
        spotify: inputData.spotify ? getSpotifyUrl(inputData.spotify) : '',
        pinterest: inputData.pinterest
            ? getPinterestUrl(inputData.pinterest)
            : '',
        reddit: inputData.reddit ? getRedditUrl(inputData.reddit) : '',
    };

    function getInputDataError() {
        const inputDataError: InputEditProfileInterface = {
            about: '',
            email:
                !inputData.email || isValidEmail(inputData.email)
                    ? ''
                    : t('message.error.invalid_email_format'),
            website:
                !inputData.website || isValidURL(inputData.website)
                    ? ''
                    : t('message.error.invalid_url_format'),
            phone_number:
                !inputData.phone_number ||
                isValidPhoneNumber(inputData.phone_number)
                    ? ''
                    : t('message.error.invalid_phone_number_format'),
            instagram:
                !inputData.instagram || isValidUsername(inputData.instagram)
                    ? ''
                    : t('message.error.invalid_username_format'),
            facebook:
                !inputData.facebook || isValidUsername(inputData.facebook)
                    ? ''
                    : t('message.error.invalid_username_format'),
            twitter:
                !inputData.twitter || isValidUsername(inputData.twitter)
                    ? ''
                    : t('message.error.invalid_username_format'),
            tiktok:
                !inputData.tiktok || isValidUsername(inputData.tiktok)
                    ? ''
                    : t('message.error.invalid_username_format'),
            youtube:
                !inputData.youtube || isValidUsername(inputData.youtube)
                    ? ''
                    : t('message.error.invalid_username_format'),
            linkedin:
                !inputData.linkedin || isValidUsername(inputData.linkedin)
                    ? ''
                    : t('message.error.invalid_username_format'),
            whatsapp:
                !inputData.whatsapp || isValidPhoneNumber(inputData.whatsapp)
                    ? ''
                    : t('message.error.invalid_phone_number_format'),
            telegram:
                !inputData.telegram || isValidUsername(inputData.telegram)
                    ? ''
                    : t('message.error.invalid_username_format'),
            discord:
                !inputData.discord || isValidURL(inputData.discord)
                    ? ''
                    : t('message.error.invalid_url_format'),
            github:
                !inputData.github || isValidUsername(inputData.github)
                    ? ''
                    : t('message.error.invalid_username_format'),
            spotify:
                !inputData.spotify || isValidUsername(inputData.spotify)
                    ? ''
                    : t('message.error.invalid_username_format'),
            pinterest:
                !inputData.pinterest || isValidUsername(inputData.pinterest)
                    ? ''
                    : t('message.error.invalid_username_format'),
            reddit:
                !inputData.reddit || isValidUsername(inputData.reddit)
                    ? ''
                    : t('message.error.invalid_username_format'),
        };

        return inputDataError;
    }

    const inputDataError = getInputDataError();

    function onSaveProfile(handleClose: () => void) {
        apiPutProfile
            .callAndWait(inputData)
            .then(() => {
                setRefresh();
                toast.success(t('message.success.saved'), {
                    theme: 'colored',
                });
                handleClose();
            })
            .catch((err) => {
                showError(err);
            });
    }

    return (
        <FullScreenDialog
            title={t('profile.edit_profile')}
            action={(handleClose) => {
                return (
                    <Button
                        autoFocus
                        color='inherit'
                        variant='outlined'
                        onClick={() => onSaveProfile(handleClose)}
                        disabled={
                            isObjectHasValues(inputDataError) ||
                            apiPutProfile.loading
                        }
                    >
                        {t('button.save')}
                    </Button>
                );
            }}
            triggerButton={
                <Button
                    variant='outlined'
                    color='inherit'
                    size='small'
                    sx={{ textTransform: 'none' }}
                >
                    {t('profile.edit_profile')}
                </Button>
            }
        >
            <Stack spacing={2} className='mb-4'>
                <Alert severity='warning'>
                    {t('profile.message_the_data_will_be_publicly_accessible')}
                </Alert>
                <Box className='w-full'>
                    <InputLabel>{t('profile.bio')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={inputData.about}
                        onChange={(e) => {
                            const eVal = e.target.value;
                            if (eVal.length > MaxLength.MAX_ABOUT) return;
                            setInputData((oldState) => ({
                                ...oldState,
                                about: eVal,
                            }));
                        }}
                        multiline
                        minRows={4}
                    />
                </Box>
                <Box className='w-full'>
                    <InputLabel>{t('profile.phone_number')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={inputData.phone_number}
                        onChange={(e) => {
                            const eVal = e.target.value;
                            if (eVal.length > MaxLength.MAX_PHONE_NUMBER)
                                return;
                            setInputData((oldState) => ({
                                ...oldState,
                                phone_number: eVal,
                            }));
                        }}
                        type='tel'
                        error={Boolean(inputDataError.phone_number)}
                        helperText={inputDataError.phone_number}
                    />
                </Box>
                <Box className='w-full'>
                    <InputLabel>{t('profile.email')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={inputData.email}
                        onChange={(e) => {
                            const eVal = e.target.value;
                            if (eVal.length > MaxLength.MAX_EMAIL) return;
                            setInputData((oldState) => ({
                                ...oldState,
                                email: eVal,
                            }));
                        }}
                        type='email'
                        error={Boolean(inputDataError.email)}
                        helperText={inputDataError.email}
                    />
                </Box>
                <Box className='w-full'>
                    <InputLabel>{t('profile.website')}</InputLabel>
                    <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        value={inputData.website}
                        onChange={(e) => {
                            const eVal = e.target.value;
                            if (eVal.length > MaxLength.MAX_URL) return;
                            setInputData((oldState) => ({
                                ...oldState,
                                website: eVal,
                            }));
                        }}
                        type='url'
                        error={Boolean(inputDataError.website)}
                        helperText={inputDataError.website}
                    />
                </Box>
            </Stack>

            <SingleAccordion
                type='standard'
                title={
                    <Typography className='flex gap-1'>
                        <TagIcon fontSize='small' />
                        <span>{t('profile.social_media_account')}</span>
                    </Typography>
                }
            >
                <Stack spacing={2}>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.instagram')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.instagram}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    instagram: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.instagram)}
                            helperText={
                                inputDataError.instagram || (
                                    <HelperLink
                                        url={socialMediaUrls.instagram}
                                    />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.facebook')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.facebook}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    facebook: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.facebook)}
                            helperText={
                                inputDataError.facebook || (
                                    <HelperLink
                                        url={socialMediaUrls.facebook}
                                    />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.twitter')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.twitter}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    twitter: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.twitter)}
                            helperText={
                                inputDataError.twitter || (
                                    <HelperLink url={socialMediaUrls.twitter} />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.tiktok')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.tiktok}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    tiktok: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.tiktok)}
                            helperText={
                                inputDataError.tiktok || (
                                    <HelperLink url={socialMediaUrls.tiktok} />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.youtube')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.youtube}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    youtube: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.youtube)}
                            helperText={
                                inputDataError.youtube || (
                                    <HelperLink url={socialMediaUrls.youtube} />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.linkedin')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.linkedin}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    linkedin: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.linkedin)}
                            helperText={
                                inputDataError.linkedin || (
                                    <HelperLink
                                        url={socialMediaUrls.linkedin}
                                    />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.whatsapp')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.whatsapp}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (eVal.length > MaxLength.MAX_PHONE_NUMBER)
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    whatsapp: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_phone_number')}
                            error={Boolean(inputDataError.whatsapp)}
                            helperText={
                                inputDataError.whatsapp || (
                                    <HelperLink
                                        url={socialMediaUrls.whatsapp}
                                    />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.telegram')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.telegram}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    telegram: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.telegram)}
                            helperText={
                                inputDataError.telegram || (
                                    <HelperLink
                                        url={socialMediaUrls.telegram}
                                    />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.discord')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.discord}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (eVal.length > MaxLength.MAX_URL) return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    discord: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_account_url')}
                            error={Boolean(inputDataError.discord)}
                            helperText={
                                inputDataError.discord || (
                                    <HelperLink url={socialMediaUrls.discord} />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.github')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.github}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    github: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.github)}
                            helperText={
                                inputDataError.github || (
                                    <HelperLink url={socialMediaUrls.github} />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.spotify')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.spotify}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    spotify: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.spotify)}
                            helperText={
                                inputDataError.spotify || (
                                    <HelperLink url={socialMediaUrls.spotify} />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.pinterest')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.pinterest}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    pinterest: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.pinterest)}
                            helperText={
                                inputDataError.pinterest || (
                                    <HelperLink
                                        url={socialMediaUrls.pinterest}
                                    />
                                )
                            }
                        />
                    </Box>
                    <Box className='w-full'>
                        <InputLabel>{t('profile.reddit')}</InputLabel>
                        <TextField
                            variant='outlined'
                            size='small'
                            fullWidth
                            value={inputData.reddit}
                            onChange={(e) => {
                                const eVal = e.target.value;
                                if (
                                    eVal.length >
                                    MaxLength.MAX_SOCIAL_MEDIA_USERNAME
                                )
                                    return;
                                setInputData((oldState) => ({
                                    ...oldState,
                                    reddit: eVal,
                                }));
                            }}
                            placeholder={t('profile.type_your_username')}
                            error={Boolean(inputDataError.reddit)}
                            helperText={
                                inputDataError.reddit || (
                                    <HelperLink url={socialMediaUrls.reddit} />
                                )
                            }
                        />
                    </Box>
                </Stack>
            </SingleAccordion>
        </FullScreenDialog>
    );
}
