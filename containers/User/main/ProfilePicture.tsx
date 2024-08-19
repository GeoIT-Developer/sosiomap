import { Avatar, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    getMimeTypeFromURL,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';

export default function ProfilePicture({
    name,
    photoURL,
}: {
    name: string;
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
        <Box className='relative w-fit mx-auto'>
            {photoURL ? (
                <ImageViewer media={media}>
                    <Avatar
                        sx={{
                            width: '5rem',
                            height: '5rem',
                        }}
                        className='mx-auto mt-[-2.5rem] border-2 border-primary border-solid cursor-pointer'
                        alt={name}
                        src={photoURL}
                    />
                </ImageViewer>
            ) : (
                <Avatar
                    sx={{
                        width: '5rem',
                        height: '5rem',
                        fontSize: 'xx-large',
                        fontWeight: 'bold',
                        bgcolor: stringToColor(name),
                    }}
                    className='mx-auto mt-[-2.5rem] !p-0.5 bg-primary'
                    alt={name}
                >
                    {nameToInitial(name)}
                </Avatar>
            )}
        </Box>
    );
}
