import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import { getMimeTypeFromURL } from '@/utils/helper';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';

export default function ProfileCover({
    photoURL,
}: {
    photoURL: string | undefined;
}) {
    const [media, setMedia] = useState<MediaType[]>([]);

    useEffect(() => {
        if (photoURL) {
            setMedia([
                {
                    url: photoURL,
                    fileType: getMimeTypeFromURL(photoURL),
                },
            ]);
        }
    }, [photoURL]);

    return (
        <Box className='aspect-[3/1] w-full overflow-hidden relative'>
            <ImageViewer media={media}>
                <MyImage
                    src={
                        photoURL
                            ? photoURL
                            : `${ASSETS.PLACEHOLDER}/profile_cover.jpg`
                    }
                    alt='cover'
                    className='w-full object-cover h-full pb-0.5 bg-primary cursor-pointer'
                />
            </ImageViewer>
        </Box>
    );
}
