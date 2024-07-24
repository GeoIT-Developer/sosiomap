import { useEffect, useState } from 'react';
import Lightbox, { Slide } from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';

export type SimpleLightboxType = { open: boolean; index: number };

type Props = {
    media: { url: string; fileType: string; caption?: string }[];
    openLightBox: {
        open: boolean;
        index: number;
    };
    setOpenLightBox: React.Dispatch<
        React.SetStateAction<{
            open: boolean;
            index: number;
        }>
    >;
};

export default function SimpleLightbox({
    media,
    openLightBox,
    setOpenLightBox,
}: Props) {
    const [slides, setSlides] = useState<Slide[]>([]);

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
        <Lightbox
            plugins={[Video, Zoom, Counter, Captions]}
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
    );
}
