import { styled } from '@mui/material/styles';
import { Badge, IconButton, Stack } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import MyImage from '@/components/preview/MyImage';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import Video from 'yet-another-react-lightbox/plugins/video';
import MyVideo from '@/components/preview/MyVideo';
import { useI18n } from '@/locales/client';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import { fileToObjectURL } from '@/utils/helper';

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

export type TheFileType = { file: File; url: string };

type Props = {
    maxFile: number;
    onFilesChange?: (files: TheFileType[]) => void;
};

export default function ImageVideoUploadStandard({
    maxFile,
    onFilesChange,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [eFiles, setEFiles] = useState<TheFileType[]>([]);
    const [openLightBox, setOpenLightBox] = useState<{
        open: boolean;
        index: number;
    }>({ open: false, index: 0 });
    const t = useI18n();

    useEffect(() => {
        if (onFilesChange) {
            onFilesChange(eFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eFiles]);

    return (
        <Stack direction='row' spacing={1}>
            {eFiles.map((item, idx) => {
                return (
                    <Badge
                        key={idx}
                        badgeContent={
                            <IconButton
                                color='error'
                                onClick={() => {
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
                        // accept='image/*, video/*'
                        accept='image/*'
                        onChange={(e) => {
                            const filesArray: File[] = Array.from(
                                e.target.files || [],
                            );
                            const maxFilesArray = filesArray.slice(0, maxFile);
                            const fileArrayURL = maxFilesArray.map((item) => {
                                return {
                                    file: item,
                                    url: fileToObjectURL(item),
                                };
                            });
                            setEFiles((oldState) => {
                                const newState = [...oldState, ...fileArrayURL];
                                if (newState.length > maxFile) {
                                    toast.info(
                                        // @ts-ignore
                                        t('message.error.max_file', {
                                            max: maxFile,
                                        }),
                                        { theme: 'colored' },
                                    );
                                }
                                const newMaxArray = newState.slice(-maxFile);

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
            <Lightbox
                plugins={[Video, Zoom, Counter]}
                open={openLightBox.open}
                index={openLightBox.index}
                close={() =>
                    setOpenLightBox((oldState) => ({
                        ...oldState,
                        open: false,
                    }))
                }
                slides={eFiles.map((item) => {
                    if (item.file.type.startsWith('video/')) {
                        return {
                            type: 'video',
                            sources: [
                                {
                                    src: item.url,
                                    type: item.file.type,
                                },
                            ],
                        };
                    }
                    return { src: item.url };
                })}
            />
        </Stack>
    );
}
