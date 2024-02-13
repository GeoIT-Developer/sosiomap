import { IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Lightbox, { Slide } from 'yet-another-react-lightbox';
import MyImage from '@/components/preview/MyImage';
import Video from 'yet-another-react-lightbox/plugins/video';
import MyVideo from '@/components/preview/MyVideo';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';

type Props = {
    media: { url: string; fileType: string; caption?: string }[];
};

export default function ImageVideoStandard({ media }: Props) {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [openLightBox, setOpenLightBox] = useState<{
        open: boolean;
        index: number;
    }>({ open: false, index: 0 });

    useEffect(() => {
        setSlides(
            media.map((item) => {
                if (item.fileType.startsWith('video/')) {
                    return {
                        type: 'video',
                        sources: [
                            {
                                src: item.url,
                                type: item.fileType,
                            },
                        ],
                        description: item.caption,
                    };
                }
                return { src: item.url, description: item.caption };
            }),
        );
    }, [media]);

    return (
        <Stack spacing={1}>
            <Lightbox
                plugins={[Video, Thumbnails, Zoom, Counter, Captions]}
                open={openLightBox.open}
                index={openLightBox.index}
                slides={slides}
                close={() =>
                    setOpenLightBox((oldState) => ({
                        ...oldState,
                        open: false,
                    }))
                }
            />

            <Stack
                direction='row'
                spacing={1}
                className='overflow-x-auto py-2'
                style={{ minWidth: '300px' }}
            >
                {media.slice(0, 2).map((item, idx) => {
                    return (
                        <IconButton
                            key={idx}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setOpenLightBox({
                                    open: true,
                                    index: idx,
                                });
                            }}
                            className='w-fit h-fit !rounded-none !p-0'
                        >
                            {item.fileType.startsWith('video/') ? (
                                <MyVideo
                                    src={item.url}
                                    style={{
                                        width: '5rem',
                                        height: '5rem',
                                        objectFit: 'cover',
                                        borderRadius: '0.5rem',
                                    }}
                                    type={item.fileType}
                                    autoplay={false}
                                    controls={false}
                                />
                            ) : (
                                <MyImage
                                    src={item.url}
                                    alt={item.url}
                                    style={{
                                        width: '5rem',
                                        height: '5rem',
                                        objectFit: 'cover',
                                        borderRadius: '0.5rem',
                                    }}
                                />
                            )}
                        </IconButton>
                    );
                })}

                {media.length > 2 && (
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenLightBox({
                                open: true,
                                index: 3,
                            });
                        }}
                        className='w-fit h-fit !rounded-none !p-0 !text-center !bg-slate-700'
                    >
                        <Typography
                            variant='body1'
                            className='!text-6xl pt-3'
                            style={{
                                width: '5rem',
                                height: '5rem',
                                borderRadius: '0.5rem',
                            }}
                        >
                            +{media.length - 2}
                        </Typography>
                    </IconButton>
                )}
            </Stack>
        </Stack>
    );
}
