export const COOKIE = {
    TOKEN: 'token',
};

export const LOCAL_STORAGE = {
    THEME: 'theme',
    BASEMAP: 'basemap',
    MAP_INITIAL: 'map-initial',
    LASK_KNOWN_LOCATION: 'last-known-location',
    CHAT_DISTANCE: 'chat-distance',
    CHAT_CHANNEL: 'chat-channel',
    ACTIVE_TOPIC: 'active-topic',
    REFRESH_SIGN_IN: 'refresh-sign-in',
    INSTALL_ANDROID_APP_POPUP: 'install-android-app-popup',
};

export const KEYCLOAK_BASE = `${process.env.NEXTAUTH_URL_IAM}realms/${process.env.NEXTAUTH_REALM_IAM}`;

export const ROUTE = {
    HOME: {
        URL: '/',
        MAP: {
            URL: '',
        },
        PROFILE: {
            URL: '#profile',
        },
        MENU: {
            URL: '#menu',
        },
        CHAT: {
            URL: '#chat',
        },
        EXPLORE: {
            URL: '#explore',
        },
    },
    ABOUT: {
        URL: '/about',
    },
    PRIVACY_POLICY: {
        URL: '/privacy-policy',
    },
    TERMS_AND_CONDITIONS: {
        URL: '/terms-and-conditions',
    },
    CLEAR_DATA: {
        URL: '/clear-data',
    },
    DOWNLOAD_DATA: {
        URL: '/download-data',
    },
    POST: {
        NEW: {
            URL: '/post/new',
        },
        DETAIL: {
            URL: '/post/[post_id]',
            setURL: (id: string) => `/post/${id}`,
        },
    },
    USER: {
        DETAIL: {
            URL: '/user/[username]',
            setURL: (username: string) => `/user/${username}`,
        },
    },
    SETTING: {
        ACCOUNT_DELETION: {
            URL: '/setting/account-deletion',
        },
    },
    KEYCLOAK: {
        EDIT_PROFILE: {
            URL: `${KEYCLOAK_BASE}/account/#/personal-info`,
        },
    },
};

export const ROUTE_EXTERNAL = {
    PLAY_STORE: {
        LABEL: 'Google Play Store',
        URL: 'https://play.google.com/store/apps/details?id=com.sosiomap.twa',
    },
    LINKEDIN: {
        URL: 'https://linkedin.com/company/sosiomap',
    },
    INSTAGRAM: {
        URL: 'https://www.instagram.com/sosiomap',
    },
    X_TWITTER: {
        URL: 'https://x.com/sosiomap',
    },
    GEOIT_DEVELOPER: {
        URL: 'https://geoit.dev/',
    },
    GITHUB_ALF: {
        URL: 'https://github.com/Alf-Anas',
    },
    LINKEDIN_ALF: {
        URL: 'https://www.linkedin.com/in/alfadila-anas/',
    },
    YOUTUBE_ALF: {
        URL: 'https://www.youtube.com/channel/UCom_vFWnb6-1TWgtMg4lt1g',
    },
    INSTAGRAM_ALF: {
        URL: 'https://www.instagram.com/alf.anas_',
    },
    X_TWITTER_ALF: {
        URL: 'https://x.com/alf_anas',
    },
};

export const SOCIAL_MEDIA = {
    getInstagramUrl: (username: string) =>
        `https://www.instagram.com/${username}`,
    getFacebookUrl: (username: string) =>
        `https://www.facebook.com/${username}`,
    getTwitterUrl: (username: string) => `https://twitter.com/${username}`,
    getTiktokUrl: (username: string) => `https://www.tiktok.com/@${username}`,
    getYouTubeUrl: (channel: string) => `https://www.youtube.com/@${channel}`,
    getLinkedinUrl: (username: string) =>
        `https://www.linkedin.com/in/${username}`,
    getWhatsappUrl: (phone_number: string) => `https://wa.me/${phone_number}`,
    getTelegramUrl: (username: string) => `https://t.me/${username}`,
    getDiscordUrl: (invite_link: string) => invite_link,
    getRedditUrl: (username: string) =>
        `https://www.reddit.com/user/${username}`,
    getPinterestUrl: (username: string) =>
        `https://www.pinterest.com/${username}`,
    getGithubUrl: (username: string) => `https://github.com/${username}`,
    getSpotifyUrl: (username: string) =>
        `https://open.spotify.com/user/${username}`,
};

export const CONTACT = {
    EMAIL: {
        ADDRESS: 'info@geoit.dev',
    },
};

export const ASSETS = {
    FLAG_IMAGE: '/img/flag/',
    BASEMAP_IMAGE: '/img/basemap/',
    MARKER: '/img/marker/',
    ICON: '/img/icon/',
    PLACEHOLDER: '/img/placeholder/',
    TEAM: '/img/team/',
    BADGE: '/img/badge/',
    REACTION: '/img/reaction/',
};

export const IDs = {
    // MAIN_MAP_CONTAINER: 'main-map-container',
};

export const QUERY = {
    LOCATION: 'location',
    LON: 'lon',
    LAT: 'lat',
    TOPIC: 'topic',
    FLY_TO: 'fly-to',
};

export const POPUP_PARAMS = {
    IMAGE_VIEWER: {
        KEY: 'image-viewer',
        VALUE: 'open',
    },
    IMAGE_CROPPER: {
        KEY: 'image-cropper',
        VALUE: 'open',
    },
    FULL_SCRREN_DIALOG: {
        KEY: 'full-screen-dialog',
        VALUE: 'open',
    },
    DIALOG: {
        KEY: 'dialog',
        VALUE: 'open',
    },
    POST_DETAIL: {
        KEY: 'post-id',
        VALUE: 'id',
    },
};

export const MAX_LENGTH = {
    POST: {
        STANDARD: {
            TITLE: 120,
            BODY: 2200,
            MAX_FILE: 4,
        },
        CAROUSEL: {
            TITLE: 120,
            BODY: 2200,
            MAX_FILE: 10,
            CAPTION: 280,
        },
        SIMPLE: {
            TITLE: 64,
            BODY: 128,
        },
        MIN_BODY: 25,
    },
    TOPIC: {
        LABEL: 64,
        DESCRIPTION: 280,
    },
    CHAT: {
        MIN_CHAT: 5,
        MAX_CHAT: 200,
    },
    PROFILE: {
        MAX_SOCIAL_MEDIA_USERNAME: 30,
        MAX_URL: 100,
        MAX_ABOUT: 500,
        MAX_PHONE_NUMBER: 15,
        MAX_EMAIL: 50,
    },
};
