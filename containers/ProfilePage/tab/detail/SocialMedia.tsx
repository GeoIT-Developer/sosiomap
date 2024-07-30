import { Box, IconButton } from '@mui/material';
import { SOCIAL_MEDIA } from '@/utils/constant';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedditIcon from '@mui/icons-material/Reddit';
import ChildCareIcon from '@mui/icons-material/ChildCare';

type Props = {
    profile: ProfileDataInterface;
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

export default function SocialMedia({ profile }: Props) {
    const { social_media } = profile;

    return (
        <Box className='mt-4 mb-2 flex flex-wrap gap-1 justify-center'>
            {social_media?.instagram && (
                <IconButton
                    aria-label='instagram'
                    onClick={() =>
                        window.open(
                            getInstagramUrl(social_media.instagram || ''),
                            '_blank',
                        )
                    }
                >
                    <InstagramIcon />
                </IconButton>
            )}
            {social_media?.facebook && (
                <IconButton
                    aria-label='facebook'
                    onClick={() =>
                        window.open(
                            getFacebookUrl(social_media.facebook || ''),
                            '_blank',
                        )
                    }
                >
                    <FacebookIcon />
                </IconButton>
            )}
            {social_media?.twitter && (
                <IconButton
                    aria-label='twitter'
                    onClick={() =>
                        window.open(
                            getTwitterUrl(social_media.twitter || ''),
                            '_blank',
                        )
                    }
                >
                    <XIcon />
                </IconButton>
            )}
            {social_media?.tiktok && (
                <IconButton
                    aria-label='tiktok'
                    onClick={() =>
                        window.open(
                            getTiktokUrl(social_media.tiktok || ''),
                            '_blank',
                        )
                    }
                >
                    <MusicNoteIcon />
                </IconButton>
            )}
            {social_media?.youtube && (
                <IconButton
                    aria-label='youtube'
                    onClick={() =>
                        window.open(
                            getYouTubeUrl(social_media.youtube || ''),
                            '_blank',
                        )
                    }
                >
                    <YouTubeIcon />
                </IconButton>
            )}
            {social_media?.linkedin && (
                <IconButton
                    aria-label='linkedin'
                    onClick={() =>
                        window.open(
                            getLinkedinUrl(social_media.linkedin || ''),
                            '_blank',
                        )
                    }
                >
                    <LinkedInIcon />
                </IconButton>
            )}
            {social_media?.whatsapp && (
                <IconButton
                    aria-label='whatsapp'
                    onClick={() =>
                        window.open(
                            getWhatsappUrl(social_media.whatsapp || ''),
                            '_blank',
                        )
                    }
                >
                    <WhatsAppIcon />
                </IconButton>
            )}
            {social_media?.telegram && (
                <IconButton
                    aria-label='telegram'
                    onClick={() =>
                        window.open(
                            getTelegramUrl(social_media.telegram || ''),
                            '_blank',
                        )
                    }
                >
                    <TelegramIcon />
                </IconButton>
            )}
            {social_media?.discord && (
                <IconButton
                    aria-label='discord'
                    onClick={() =>
                        window.open(
                            getDiscordUrl(social_media.discord || ''),
                            '_blank',
                        )
                    }
                >
                    <ChildCareIcon />
                </IconButton>
            )}
            {social_media?.github && (
                <IconButton
                    aria-label='github'
                    onClick={() =>
                        window.open(
                            getGithubUrl(social_media.github || ''),
                            '_blank',
                        )
                    }
                >
                    <GitHubIcon />
                </IconButton>
            )}
            {social_media?.spotify && (
                <IconButton
                    aria-label='spotify'
                    onClick={() =>
                        window.open(
                            getSpotifyUrl(social_media.spotify || ''),
                            '_blank',
                        )
                    }
                >
                    <PodcastsIcon />
                </IconButton>
            )}
            {social_media?.pinterest && (
                <IconButton
                    aria-label='pinterest'
                    onClick={() =>
                        window.open(
                            getPinterestUrl(social_media.pinterest || ''),
                            '_blank',
                        )
                    }
                >
                    <PinterestIcon />
                </IconButton>
            )}
            {social_media?.reddit && (
                <IconButton
                    aria-label='spotify'
                    onClick={() =>
                        window.open(
                            getRedditUrl(social_media.reddit || ''),
                            '_blank',
                        )
                    }
                >
                    <RedditIcon />
                </IconButton>
            )}
        </Box>
    );
}
