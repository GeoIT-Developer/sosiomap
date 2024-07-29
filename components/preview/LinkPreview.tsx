import { useEffect } from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Link,
    Skeleton,
    Typography,
} from '@mui/material';
import useAPI from '@/hooks/useAPI';
import API_VENDOR from '@/configs/api.vendor';
import { UrlMetadataInterface } from '@/types/api/responses/url-metadata.interface';

export type MediaType = { url: string; fileType: string; caption?: string };

type Props = {
    url: string;
    show?: boolean;
};

export default function LinkPreview({ url: inputUrl, show = true }: Props) {
    const { data: metadata, ...apiUrlMetadata } = useAPI<
        UrlMetadataInterface,
        string
    >(API_VENDOR.getUrlMetadata, { dataKey: 'data' });

    useEffect(() => {
        if (!show) return;
        apiUrlMetadata.call(inputUrl);
    }, [inputUrl, show]);

    return (
        <Card sx={{ minWidth: 325, maxWidth: 345 }}>
            <Box
                sx={{
                    padding: '1rem',
                    textAlign: 'center',
                    borderBottom: '1px solid gray',
                }}
            >
                <Link
                    href={inputUrl}
                    target='_blank'
                    rel='noopener'
                    className='break-all'
                >
                    {inputUrl}
                </Link>
            </Box>
            {apiUrlMetadata.loading && (
                <Box sx={{ padding: '1rem' }}>
                    <Skeleton variant='rectangular' width={300} height={118} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width='60%' />
                    </Box>
                </Box>
            )}
            {(metadata?.image || metadata?.title || metadata?.description) && (
                <CardActionArea
                    onClick={() => window.open(metadata?.url, '_blank')}
                >
                    {metadata?.image && (
                        <CardMedia
                            component='img'
                            height='140'
                            image={metadata?.image}
                            alt={metadata?.title}
                        />
                    )}

                    <CardContent>
                        {metadata?.title && (
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='div'
                            >
                                {metadata?.title}
                            </Typography>
                        )}
                        {metadata?.description && (
                            <Typography variant='body2' color='text.secondary'>
                                {metadata?.description}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
            )}
        </Card>
    );
}
