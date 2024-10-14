import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Lightbox, { Slide } from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';

type Props = {
    media: { url: string; fileType: string; caption?: string }[];
};

export default function ImageVideoCarousel({ media }: Props) {
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
                plugins={[Video, Inline, Captions]}
                index={openLightBox.index}
                slides={slides}
                on={{
                    view: ({ index }) =>
                        setOpenLightBox((oldState) => ({
                            ...oldState,
                            index: index,
                        })),
                    click: () =>
                        setOpenLightBox((oldState) => ({
                            ...oldState,
                            open: true,
                        })),
                }}
                carousel={{
                    padding: 0,
                    spacing: 0,
                    imageFit: 'cover',
                }}
                inline={{
                    style: {
                        width: '100%',
                        maxWidth: '900px',
                        aspectRatio: '3 / 2',
                        margin: '0 auto',
                        // height: '200px',
                    },
                }}
            />

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
        </Stack>
    );
}
