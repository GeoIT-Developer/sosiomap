import { Box, Button, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import {
    addMinioPrefix,
    compressImage,
    fileToObjectURL,
    getMimeTypeFromURL,
} from '@/utils/helper';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VisuallyHiddenInput from '@/components/input/FileUpload/VisuallyHiddenInput';
import ImageCropper from '@/components/editor/ImageCropper';
import BootstrapDialog from '@/components/dialog/BootstrapDialog';
import { Area } from 'react-easy-crop';
import { cropImage } from '@/utils/cropImage';
import useAPI from '@/hooks/useAPI';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import API from '@/configs/api';
import { toast } from 'react-toastify';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';

export default function ProfileCover({
    photoURL,
    onRefresh,
}: {
    photoURL: string | undefined;
    onRefresh: () => void;
}) {
    const t = useI18n();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imgFileURL, setImgFileURL] = useState<string>('');
    const [openCropper, setOpenCropper] = useState(false);
    const [croppedArea, setCroppedArea] = useState<Area>();
    const [media, setMedia] = useState<MediaType[]>([]);

    const apiUpdateCover = useAPI<ProfileDataInterface, File>(
        API.putProfileCoverPhoto,
        {
            onSuccess: () => {
                onRefresh();
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
            },
        },
    );

    useEffect(() => {
        if (photoURL) {
            setMedia([
                {
                    url: addMinioPrefix(photoURL),
                    fileType: getMimeTypeFromURL(photoURL),
                },
            ]);
        }
    }, [photoURL]);

    function onCloseDialog() {
        setOpenCropper(false);
        setImgFileURL('');
    }

    function onClickSave() {
        if (!croppedArea || !imgFileURL) return;
        cropImage(imgFileURL, croppedArea, 0.8)
            .then((res) => {
                const eFIle = res?.file;
                if (eFIle) {
                    compressImage(eFIle)
                        .then((compressedFile) => {
                            apiUpdateCover.call(compressedFile);
                            onCloseDialog();
                        })
                        .catch((err) => {
                            throw new Error(err);
                        });
                } else {
                    throw new Error(t('message.error.failed_to_process_file'));
                }
            })
            .catch((err) => {
                toast.error(err, {
                    theme: 'colored',
                });
            });
    }

    return (
        <Box className='aspect-[3/1] w-full overflow-hidden relative'>
            <ImageViewer media={media}>
                <MyImage
                    src={
                        photoURL
                            ? addMinioPrefix(photoURL)
                            : `${ASSETS.PLACEHOLDER}profile_cover.jpg`
                    }
                    alt='cover'
                    className='w-full object-cover h-full pb-0.5 bg-primary'
                />
            </ImageViewer>

            <IconButton
                aria-label='edit-profile-cover'
                size='small'
                className='!absolute bottom-0 right-0'
                sx={{
                    color: 'primary.contrastText',
                    backgroundColor: (theme) =>
                        alpha(theme.palette.grey[300], 0.35),
                }}
                component='label'
            >
                <InsertPhotoIcon fontSize='small' />
                <VisuallyHiddenInput
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                        const filesArray: File[] = Array.from(
                            e.target.files || [],
                        );
                        const eImgFile = filesArray[0];
                        if (eImgFile) {
                            setImgFileURL(fileToObjectURL(eImgFile));
                            setOpenCropper(true);
                        } else {
                            setImgFileURL('');
                        }
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    }}
                />
            </IconButton>
            <BootstrapDialog
                open={openCropper}
                handleClose={onCloseDialog}
                maxWidth='md'
                action={
                    <>
                        <Button onClick={onCloseDialog}>
                            {t('button.cancel')}
                        </Button>
                        <Button
                            onClick={onClickSave}
                            disabled={apiUpdateCover.loading}
                        >
                            {t('button.save')}
                        </Button>
                    </>
                }
            >
                <Box className='min-h-[50vh] relative'>
                    <ImageCropper
                        imageURL={imgFileURL}
                        aspect={3 / 1}
                        onCropComplete={(_croppedArea, croppedAreaPixels) => {
                            setCroppedArea(croppedAreaPixels);
                        }}
                    />
                </Box>
            </BootstrapDialog>
        </Box>
    );
}
