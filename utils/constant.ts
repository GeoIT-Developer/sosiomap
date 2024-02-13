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
};

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
    },
};

export const ASSETS = {
    FLAG_IMAGE: '/img/flag/',
    BASEMAP_IMAGE: '/img/basemap/',
    MARKER: '/img/marker/',
    ICON: '/img/icon/',
    PLACEHOLDER: '/img/placeholder/',
};

export const IDs = {
    // MAIN_MAP_CONTAINER: 'main-map-container',
};

export const QUERY = {
    LOCATION: 'location',
    LON: 'lon',
    LAT: 'lat',
    TOPIC: 'topic',
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
    },
    TOPIC: {
        LABEL: 64,
        DESCRIPTION: 280,
    },
    CHAT: {
        MIN_CHAT: 5,
        MAX_CHAT: 200,
    },
};
