import { ROUTE } from '@/utils/constant';
import { MetadataRoute } from 'next';

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || '';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: HOST_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: HOST_URL + ROUTE.ABOUT.URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: HOST_URL + ROUTE.PRIVACY_POLICY.URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: HOST_URL + ROUTE.TERMS_AND_CONDITIONS.URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: HOST_URL + ROUTE.DOWNLOAD_DATA.URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: HOST_URL + ROUTE.POST.NEW.URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}
