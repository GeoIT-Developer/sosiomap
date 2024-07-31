import { Avatar, Box, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import {
    addMinioPrefix,
    fileToObjectURL,
    getMimeTypeFromURL,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VisuallyHiddenInput from '@/components/input/FileUpload/VisuallyHiddenInput';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';
import PopupImageCropper, {
    usePopupImageCropper,
} from '@/components/editor/PopupImageCropper';
import { showError } from '@/utils';

export default function ProfilePicture({
    name,
    photoURL,
    onRefresh,
}: {
    name: string;
    photoURL: string | undefined;
    onRefresh: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [media, setMedia] = useState<MediaType[]>([]);
    const popupImageCropperHooks = usePopupImageCropper();
    const { onCloseDialog, setOpenCropper, setImgFileURL, processImage } =
        popupImageCropperHooks;

    const apiUpdatePhoto = useAPI<ProfileDataInterface, File>(
        API.putProfilePhoto,
        {
            onSuccess: () => {
                onRefresh();
            },
            onError: (err) => {
                showError(err);
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

    function onClickSave() {
        processImage()
            .then((eFile) => {
                apiUpdatePhoto.call(eFile);
                onCloseDialog();
            })
            .catch((err) => {
                showError(err);
            });
    }

    return (
        <Box className='relative w-fit mx-auto'>
            {photoURL ? (
                <ImageViewer media={media}>
                    <Avatar
                        sx={{
                            width: '5rem',
                            height: '5rem',
                        }}
                        className='mx-auto mt-[-2.5rem] border-2 border-primary border-solid'
                        alt={name}
                        src={addMinioPrefix(photoURL)}
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
            <PopupImageCropper
                aspectRatio={1 / 1}
                isLoading={apiUpdatePhoto.loading}
                onSave={onClickSave}
                hooks={popupImageCropperHooks}
            />
        </Box>
    );
}
