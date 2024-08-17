import { cloneElement, ReactElement, useEffect, useState } from 'react';
import Lightbox, { Plugin, Render, Slide } from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import { POPUP_PARAMS } from '@/utils/constant';
import useQueryParams from '@/hooks/useQueryParams';

type SimpleLightboxType = { open: boolean; index: number };

export type MediaType = {
    url: string;
    fileType: string;
    title?: string;
    caption?: string;
};

type Props = {
    media: MediaType[];
    children: ReactElement;
};

export default function ImageViewer({ media, children }: Props) {
    const queryParams = useQueryParams();
    const [slides, setSlides] = useState<Slide[]>([]);
    const [openLightBox, setOpenLightBox] = useState<SimpleLightboxType>({
        open: false,
        index: 0,
    });

    const [setting, setSetting] = useState<{
        plugins: Plugin[];
        carousel: { finite: boolean } | undefined;
        render: Render | undefined;
    }>({
        plugins: [Video, Zoom, Counter, Captions],
        carousel: { finite: true },
        render: {
            iconPrev: () => undefined,
            iconNext: () => undefined,
        },
    });

    // Close the dialog when back using navigation
    useEffect(() => {
        if (!openLightBox.open) return;
        const popupParamsValue = queryParams.searchParams.get(
            POPUP_PARAMS.IMAGE_VIEWER.KEY,
        );
        if (popupParamsValue !== POPUP_PARAMS.IMAGE_VIEWER.VALUE) {
            setOpenLightBox({ index: 0, open: false });
        }
    }, [queryParams.searchParams]);

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
                        title: item.title,
                        description: item.caption,
                    };
                }
                return {
                    src: item.url,
                    title: item.title,
                    description: item.caption,
                };
            }),
        );

        if (media.length === 1) {
            setSetting({
                plugins: [Video, Zoom, Captions],
                carousel: { finite: true },
                render: {
                    iconPrev: () => undefined,
                    iconNext: () => undefined,
                },
            });
        } else {
            setSetting({
                plugins: [Video, Zoom, Counter, Captions],
                carousel: undefined,
                render: undefined,
            });
        }
    }, [media]);

    function handleOpenLightbox() {
        setOpenLightBox({ index: 0, open: true });
        // Add params when open the dialog
        queryParams.addParam(
            POPUP_PARAMS.IMAGE_VIEWER.KEY,
            POPUP_PARAMS.IMAGE_VIEWER.VALUE,
        );
    }

    function handleCloseLightbox(lastIndex = 0) {
        setOpenLightBox({ index: lastIndex, open: false });
        // Remove params when close the dialog
        queryParams.removeParam(POPUP_PARAMS.IMAGE_VIEWER.KEY);
    }

    const clonedChildren = cloneElement(children, {
        onClick: () => {
            if (media.length > 0) {
                handleOpenLightbox();
            }
        },
    });

    return (
        <>
            {clonedChildren}
            <Lightbox
                plugins={setting.plugins}
                open={openLightBox.open}
                index={openLightBox.index}
                slides={slides}
                close={() => handleCloseLightbox(openLightBox.index)}
                render={setting.render}
                carousel={setting.carousel}
            />
        </>
    );
}
