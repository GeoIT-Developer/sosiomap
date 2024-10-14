import SingleAccordion from '@/components/accordion/SingleAccordion';
import {
    Box,
    IconButton,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LanguageIcon from '@mui/icons-material/Language';
import { useScopedI18n } from '@/locales/client';
import PreviewIcon from '@mui/icons-material/Preview';
import { isValidURL } from '@/utils/helper';
import SimpleDialog from '@/components/dialog/SimpleDialog';
import {
    FacebookEmbed,
    InstagramEmbed,
    LinkedInEmbed,
    TikTokEmbed,
    TwitterEmbed,
    YouTubeEmbed,
} from 'react-social-media-embed';
import LinkPreview from '@/components/preview/LinkPreview';
import { cloneElement, useState } from 'react';

export type SocialMediaURLType = {
    instagram: string;
    tiktok: string;
    twitter: string;
    facebook: string;
    youtube: string;
    linkedin: string;
    news_website: string;
    other: string;
};

export const initialSocialMediaURLType = {
    instagram: '',
    tiktok: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    news_website: '',
    other: '',
};

type Props = {
    title?: string;
    description?: string;
    value: SocialMediaURLType;
    onChange: (val: SocialMediaURLType) => void;
    defaultOpen?: boolean;
};

export default function SocialMediaPost({
    title,
    description,
    value,
    onChange,
    defaultOpen,
}: Props) {
    const t = useScopedI18n('post.url');
    const [fields, setFields] = useState<string[]>(() => []);

    const handleChangeFields = (
        _event: React.MouseEvent<HTMLElement>,
        newFields: string[],
    ) => {
        setFields(newFields);
    };

    const LIST_SOCIAL_MEDIA = [
        {
            id: 'instagram',
            label: 'Instagram',
            icon: `${ASSETS.ICON}instagram.png`,
            embed: <InstagramEmbed url={value.instagram} width={325} />,
        },
        {
            id: 'tiktok',
            label: 'TikTok',
            icon: `${ASSETS.ICON}tiktok.ico`,
            embed: <TikTokEmbed url={value.tiktok} width={325} />,
        },
        {
            id: 'twitter',
            label: 'Twitter',
            icon: `${ASSETS.ICON}twitter.ico`,
            embed: <TwitterEmbed url={value.twitter} width={325} />,
        },
        {
            id: 'facebook',
            label: 'Facebook',
            icon: `${ASSETS.ICON}facebook.ico`,
            embed: <FacebookEmbed url={value.facebook} width={325} />,
        },
        {
            id: 'youtube',
            label: 'YouTube',
            icon: `${ASSETS.ICON}youtube.png`,
            embed: <YouTubeEmbed url={value.youtube} width={325} />,
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: `${ASSETS.ICON}linkedin.ico`,
            embed: <LinkedInEmbed url={value.linkedin} width={325} />,
        },
        {
            id: 'news_website',
            label: t('news_website'),
            icon: <NewspaperIcon sx={{ width: 24 }} />,
        },
        {
            id: 'other',
            label: t('other'),
            icon: <LanguageIcon sx={{ width: 24 }} />,
        },
    ];

    return (
        <SingleAccordion
            title={title || <>&#128279; {t('social_media_post')}</>}
            defaultOpen={defaultOpen}
            type='compact'
        >
            <ToggleButtonGroup
                value={fields}
                onChange={handleChangeFields}
                aria-label='fields'
                size='small'
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.5rem',
                }}
            >
                {LIST_SOCIAL_MEDIA.map((item, idx) => {
                    return (
                        <ToggleButton key={idx} value={item.id}>
                            {typeof item.icon === 'string' ? (
                                <MyImage
                                    src={item.icon}
                                    alt={item.id}
                                    width={24}
                                />
                            ) : (
                                item.icon
                            )}
                        </ToggleButton>
                    );
                })}
            </ToggleButtonGroup>
            <Typography variant='body2' className='!mb-4 !-mt-0'>
                &#9432; {description || t('social_media_post_desc')}
            </Typography>
            <Stack spacing={1}>
                {LIST_SOCIAL_MEDIA.map((item, idx) => {
                    const itemID = item.id as keyof typeof value;
                    const isFieldChecked = fields.includes(item.id);
                    return (
                        <Box
                            key={idx}
                            sx={{
                                display: isFieldChecked ? 'flex' : 'none',
                                alignItems: 'flex-end',
                            }}
                        >
                            {typeof item.icon === 'string' ? (
                                <MyImage
                                    src={item.icon}
                                    alt={itemID}
                                    width={28}
                                    className='my-1 mr-2'
                                />
                            ) : (
                                cloneElement(item.icon, {
                                    className: 'my-1 mr-2',
                                    sx: { width: 28 },
                                })
                            )}

                            <TextField
                                id={item.id}
                                label={item.label}
                                variant='outlined'
                                fullWidth
                                size='small'
                                value={value[itemID]}
                                onChange={(e) => {
                                    const eVal = e.target.value;
                                    const newVal = {
                                        ...value,
                                        [item.id]: eVal,
                                    };
                                    onChange(newVal);
                                }}
                            />
                            {isValidURL(value[itemID]) && item.embed && (
                                <SimpleDialog
                                    title={
                                        <Box>
                                            <MyImage
                                                src={item.icon}
                                                alt={itemID}
                                                width={28}
                                                className='mr-2 align-text-bottom'
                                            />
                                            {item.label}
                                        </Box>
                                    }
                                    triggerButton={
                                        <IconButton>
                                            <PreviewIcon />
                                        </IconButton>
                                    }
                                >
                                    <Box className='bg-white'>{item.embed}</Box>
                                </SimpleDialog>
                            )}
                            {isValidURL(value[itemID]) && !item.embed && (
                                <SimpleDialog
                                    title={
                                        <Box className='flex'>
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </Box>
                                    }
                                    triggerButton={
                                        <IconButton>
                                            <PreviewIcon />
                                        </IconButton>
                                    }
                                >
                                    <LinkPreview url={value[itemID]} />
                                </SimpleDialog>
                            )}
                        </Box>
                    );
                })}
            </Stack>
        </SingleAccordion>
    );
}
