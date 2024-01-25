import SingleAccordion from '@/components/accordion/SingleAccordion';
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
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
    TikTokEmbed,
    TwitterEmbed,
    YouTubeEmbed,
} from 'react-social-media-embed';

export type SocialMediaURLType = {
    instagram: string;
    tiktok: string;
    twitter: string;
    facebook: string;
    youtube: string;
    news_website: string;
    other: string;
};

export const initialSocialMediaURLType = {
    instagram: '',
    tiktok: '',
    twitter: '',
    facebook: '',
    youtube: '',
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
            id: 'news_website',
            label: t('news_website'),
            icon: <NewspaperIcon sx={{ width: 28 }} className='my-1 mr-2' />,
        },
        {
            id: 'other',
            label: t('other'),
            icon: <LanguageIcon sx={{ width: 28 }} className='my-1 mr-2' />,
        },
    ];

    return (
        <SingleAccordion
            title={title || <>&#128279; {t('social_media_post')}</>}
            defaultOpen={defaultOpen}
        >
            <Typography variant='body2' className='!mb-8 !-mt-2'>
                &#9432; {description || t('social_media_post_desc')}
            </Typography>
            <Stack spacing={1.5}>
                {LIST_SOCIAL_MEDIA.map((item, idx) => {
                    const itemID = item.id as keyof typeof value;
                    return (
                        <Box
                            key={idx}
                            sx={{ display: 'flex', alignItems: 'flex-end' }}
                        >
                            {typeof item.icon === 'string' ? (
                                <MyImage
                                    src={item.icon}
                                    alt={itemID}
                                    width={28}
                                    className='my-1 mr-2'
                                />
                            ) : (
                                item.icon
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
                        </Box>
                    );
                })}
            </Stack>
        </SingleAccordion>
    );
}
