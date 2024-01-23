import { styled } from '@mui/material/styles';
import { Badge, IconButton, Stack, TextField } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useRef, useState } from 'react';
import Lightbox, { Slide } from 'yet-another-react-lightbox';
import MyImage from '@/components/preview/MyImage';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import Video from 'yet-another-react-lightbox/plugins/video';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import MyVideo from '@/components/preview/MyVideo';
import { useI18n } from '@/locales/client';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export type TheFileType = { file: File; url: string; caption: string };

type Props = {
    maxFile: number;
    onFilesChange?: (files: TheFileType[]) => void;
    captionLength: number;
};

export default function ImageVideoUploadCarousel({
    maxFile,
    onFilesChange,
    captionLength,
}: Props) {
    const t = useI18n();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [eFiles, setEFiles] = useState<TheFileType[]>([]);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [openLightBox, setOpenLightBox] = useState<{
        open: boolean;
        index: number;
    }>({ open: false, index: 0 });

    useEffect(() => {
        if (onFilesChange) {
            onFilesChange(eFiles);
        }
        setSlides(
            eFiles.map((item) => {
                if (item.file.type.startsWith('video/')) {
                    return {
                        type: 'video',
                        sources: [
                            {
                                src: item.url,
                                type: item.file.type,
                            },
                        ],
                        description: item.caption,
                    };
                }
                return { src: item.url, description: item.caption };
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eFiles]);

    return (
        <Stack spacing={1}>
            <Lightbox
                plugins={[Video, Inline]}
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
                    },
                }}
            />
            {eFiles.length !== 0 && (
                <TextField
                    size='small'
                    fullWidth
                    placeholder={t('post.caption_optional')}
                    multiline
                    maxRows={4}
                    inputProps={{
                        className: 'text-center',
                    }}
                    value={eFiles[openLightBox.index]?.caption}
                    onChange={(e) => {
                        const eVal = e.target.value;
                        if (eVal.length > captionLength) return;
                        setEFiles((oldState) => {
                            const newState = [...oldState];
                            newState[openLightBox.index].caption = eVal;
                            return newState;
                        });
                    }}
                />
            )}

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

            <Stack direction='row' spacing={1} className='overflow-x-auto py-2'>
                {eFiles.map((item, idx) => {
                    return (
                        <Badge
                            key={idx}
                            badgeContent={
                                <IconButton
                                    color='error'
                                    onClick={() => {
                                        setOpenLightBox((oldState) => ({
                                            ...oldState,
                                            index: 0,
                                        }));
                                        setEFiles((oldState) => {
                                            const newArr = [...oldState];
                                            newArr.splice(idx, 1);
                                            return newArr;
                                        });
                                    }}
                                    className='!p-0 !m-0'
                                >
                                    <CloseIcon fontSize='small' />
                                </IconButton>
                            }
                        >
                            <IconButton
                                key={idx}
                                onClick={() =>
                                    setOpenLightBox({
                                        open: true,
                                        index: idx,
                                    })
                                }
                                className='w-fit h-fit !rounded-none !p-0'
                            >
                                {item.file.type.startsWith('video/') ? (
                                    <MyVideo
                                        src={item.url}
                                        style={{
                                            width: '5rem',
                                            height: '5rem',
                                            objectFit: 'cover',
                                            borderRadius: '0.5rem',
                                        }}
                                        type={item.file.type}
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
                        </Badge>
                    );
                })}
                {eFiles.length < maxFile && (
                    <IconButton
                        component='label'
                        className='w-fit h-fit !rounded-none !p-0'
                    >
                        <AddPhotoAlternateIcon
                            sx={{ width: '5rem', height: '5rem' }}
                        />
                        <VisuallyHiddenInput
                            ref={fileInputRef}
                            type='file'
                            accept='image/*, video/*'
                            onChange={(e) => {
                                const filesArray: File[] = Array.from(
                                    e.target.files || [],
                                );
                                const maxFilesArray = filesArray.slice(
                                    0,
                                    maxFile,
                                );
                                const fileArrayURL = maxFilesArray.map(
                                    (item) => {
                                        return {
                                            file: item,
                                            url: URL.createObjectURL(item),
                                            caption: '',
                                        };
                                    },
                                );
                                setEFiles((oldState) => {
                                    const newState = [
                                        ...oldState,
                                        ...fileArrayURL,
                                    ];
                                    if (newState.length > maxFile) {
                                        toast.info(
                                            // @ts-ignore
                                            t('message.error.max_file', {
                                                max: maxFile,
                                            }),
                                            { theme: 'colored' },
                                        );
                                    }
                                    const newMaxArray =
                                        newState.slice(-maxFile);

                                    return newMaxArray;
                                });
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                            }}
                            multiple
                        />
                    </IconButton>
                )}
            </Stack>
        </Stack>
    );
}
