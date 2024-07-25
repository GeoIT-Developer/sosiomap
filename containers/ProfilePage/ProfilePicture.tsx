import { Avatar, Box, Button, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useI18n } from '@/locales/client';
import {
    addMinioPrefix,
    compressImage,
    fileToObjectURL,
    getMimeTypeFromURL,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VisuallyHiddenInput from '@/components/input/FileUpload/VisuallyHiddenInput';
import ImageCropper from '@/components/editor/ImageCropper';
import BootstrapDialog from '@/components/dialog/BootstrapDialog';
import { Area } from 'react-easy-crop';
import { cropImage } from '@/utils/cropImage';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { toast } from 'react-toastify';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import SimpleLightbox, {
    SimpleLightboxType,
} from '@/components/preview/SimpleLightbox';

export default function ProfilePicture({
    name,
    photoURL,
    onRefresh,
}: {
    name: string;
    photoURL: string | undefined;
    onRefresh: () => void;
}) {
    const t = useI18n();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imgFileURL, setImgFileURL] = useState<string>('');
    const [openCropper, setOpenCropper] = useState(false);
    const [croppedArea, setCroppedArea] = useState<Area>();
    const [openLightBox, setOpenLightBox] = useState<SimpleLightboxType>({
        open: false,
        index: 0,
    });

    const apiUpdatePhoto = useAPI<ProfileDataInterface, File>(
        API.putProfilePhoto,
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
                            apiUpdatePhoto.call(compressedFile);
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
        <Box className='relative w-fit mx-auto'>
            {photoURL ? (
                <Avatar
                    sx={{
                        width: '5rem',
                        height: '5rem',
                    }}
                    className='mx-auto mt-[-2.5rem] !p-0.5'
                    alt={name}
                    src={addMinioPrefix(photoURL)}
                    onClick={() => setOpenLightBox({ index: 0, open: true })}
                />
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

            <IconButton
                aria-label='edit-profile'
                size='small'
                className='!absolute bottom-0 right-0'
                sx={{
                    color: 'primary.contrastText',
                    backgroundColor: (theme) =>
                        alpha(theme.palette.grey[300], 0.35),
                }}
                component='label'
            >
                <CameraAltIcon fontSize='small' />
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
                            disabled={apiUpdatePhoto.loading}
                        >
                            {t('button.save')}
                        </Button>
                    </>
                }
            >
                <Box className='min-h-[50vh] relative'>
                    <ImageCropper
                        imageURL={imgFileURL}
                        aspect={1 / 1}
                        onCropComplete={(_croppedArea, croppedAreaPixels) => {
                            setCroppedArea(croppedAreaPixels);
                        }}
                    />
                </Box>
            </BootstrapDialog>
            {photoURL && (
                <SimpleLightbox
                    media={[
                        {
                            url: addMinioPrefix(photoURL),
                            fileType: getMimeTypeFromURL(photoURL),
                        },
                    ]}
                    openLightBox={openLightBox}
                    setOpenLightBox={setOpenLightBox}
                />
            )}
        </Box>
    );
}
