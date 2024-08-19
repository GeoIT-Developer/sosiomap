import { Box, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import { fileToObjectURL, getMimeTypeFromURL } from '@/utils/helper';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VisuallyHiddenInput from '@/components/input/FileUpload/VisuallyHiddenInput';
import useAPI from '@/hooks/useAPI';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import API from '@/configs/api';
import ImageViewer, { MediaType } from '@/components/preview/ImageViewer';
import PopupImageCropper, {
    usePopupImageCropper,
} from '@/components/editor/PopupImageCropper';
import { showError } from '@/utils';

export default function ProfileCover({
    photoURL,
    onRefresh,
}: {
    photoURL: string | undefined;
    onRefresh: () => void;
}) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [media, setMedia] = useState<MediaType[]>([]);

    const popupImageCropperHooks = usePopupImageCropper();
    const { onCloseDialog, setOpenCropper, setImgFileURL, processImage } =
        popupImageCropperHooks;

    const apiUpdateCover = useAPI<ProfileDataInterface, File>(
        API.putProfileCoverPhoto,
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
                    url: photoURL,
                    fileType: getMimeTypeFromURL(photoURL),
                },
            ]);
        }
    }, [photoURL]);

    function onClickSave() {
        processImage()
            .then((eFile) => {
                apiUpdateCover.call(eFile);
                onCloseDialog();
            })
            .catch((err) => {
                showError(err);
            });
    }

    return (
        <Box className='aspect-[3/1] w-full overflow-hidden relative'>
            <ImageViewer media={media}>
                <MyImage
                    src={
                        photoURL
                            ? photoURL
                            : `${ASSETS.PLACEHOLDER}profile_cover.jpg`
                    }
                    alt='cover'
                    className='w-full object-cover h-full pb-0.5 bg-primary cursor-pointer'
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

            <PopupImageCropper
                aspectRatio={3 / 1}
                isLoading={apiUpdateCover.loading}
                onSave={onClickSave}
                hooks={popupImageCropperHooks}
            />
        </Box>
    );
}
