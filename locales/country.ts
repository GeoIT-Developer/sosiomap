interface CountryType {
    locale: string;
    label: string;
    flag: string;
}

export const LIST_COUNTRY: CountryType[] = [
    {
        locale: 'EN',
        flag: 'gb.png',
        label: 'English',
    },
    {
        locale: 'ID',
        flag: 'id.png',
        label: 'Indonesia',
    },
];
