import { NextRequest, NextResponse } from 'next/server';
import urlMetadata from 'url-metadata';

interface Metadata {
    title: string;
    description: string;
    image: string;
    url: string;
}
function extractMetadata(metadata: urlMetadata.Result): Metadata {
    const defaultTitle = '';
    const defaultDescription = '';
    const defaultImage = '';

    const title =
        metadata['title'] ||
        metadata['og:title'] ||
        metadata['twitter:title'] ||
        defaultTitle;

    const description =
        metadata['description'] ||
        metadata['og:description'] ||
        metadata['twitter:description'] ||
        defaultDescription;

    const image =
        metadata['image'] ||
        metadata['og:image'] ||
        metadata['twitter:image'] ||
        defaultImage;

    return { url: metadata.url, title, description, image };
}

export async function GET(req: NextRequest) {
    try {
        const urlInput = req.nextUrl.searchParams.get('url') as string;
        if (!urlInput) {
            throw new Error('URL is required');
        }
        const metadata = await urlMetadata(urlInput);
        return NextResponse.json(
            { data: extractMetadata(metadata) },
            { status: 200 },
        );
    } catch (err) {
        return NextResponse.json(
            { error: JSON.stringify(err) },
            { status: 422 },
        );
    }
}
