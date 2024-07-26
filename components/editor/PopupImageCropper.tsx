import { Box, Button } from '@mui/material';
import { useI18n } from '@/locales/client';
import ImageCropper from '@/components/editor/ImageCropper';
import BootstrapDialog from '@/components/dialog/BootstrapDialog';
import { Area } from 'react-easy-crop';
import { useEffect, useState } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import { POPUP_PARAMS } from '@/utils/constant';
import { cropImage } from '@/utils/cropImage';
import { compressImage } from '@/utils/helper';

export function usePopupImageCropper() {
    const t = useI18n();
    const queryParams = useQueryParams();
    const [imgFileURL, setImgFileURL] = useState<string>('');
    const [openCropper, setOpenCropper] = useState(false);
    const [croppedArea, setCroppedArea] = useState<Area>();

    // Add params when open popup
    useEffect(() => {
        if (openCropper) {
            queryParams.addParam(
                POPUP_PARAMS.IMAGE_CROPPER.KEY,
                POPUP_PARAMS.IMAGE_CROPPER.VALUE,
            );
        }
    }, [openCropper]);

    function onCloseDialog() {
        setOpenCropper(false);
        setImgFileURL('');
        // Remove params when close popup
        queryParams.removeParam(POPUP_PARAMS.IMAGE_CROPPER.KEY);
    }

    // Close the popup when back using navigation
    useEffect(() => {
        if (!openCropper) return;
        const popupParamsValue = queryParams.searchParams.get(
            POPUP_PARAMS.IMAGE_CROPPER.KEY,
        );
        if (popupParamsValue !== POPUP_PARAMS.IMAGE_CROPPER.VALUE) {
            setOpenCropper(false);
        }
    }, [queryParams.searchParams]);

    const processImage = (quality = 0.8): Promise<File> => {
        return new Promise(async (resolve, reject) => {
            if (!imgFileURL || !croppedArea) {
                return reject(new Error(t('message.error.file_not_found')));
            }
            try {
                const res = await cropImage(imgFileURL, croppedArea, quality);
                const eFile = res?.file;

                if (!eFile) {
                    return reject(
                        new Error(t('message.error.failed_to_process_file')),
                    );
                }

                const compressedFile = await compressImage(eFile);
                resolve(compressedFile);
            } catch (err: any) {
                reject(err);
            }
        });
    };

    return {
        imgFileURL,
        setImgFileURL,
        openCropper,
        setOpenCropper,
        croppedArea,
        setCroppedArea,
        onCloseDialog,
        processImage,
    };
}

type Props = {
    onSave: () => void;
    aspectRatio: number;
    isLoading: boolean;
    hooks: {
        imgFileURL: string;
        setImgFileURL: React.Dispatch<React.SetStateAction<string>>;
        openCropper: boolean;
        setOpenCropper: React.Dispatch<React.SetStateAction<boolean>>;
        croppedArea: Area | undefined;
        setCroppedArea: React.Dispatch<React.SetStateAction<Area | undefined>>;
        onCloseDialog: () => void;
    };
};

export default function PopupImageCropper({
    onSave,
    aspectRatio = 1 / 1,
    isLoading,
    hooks,
}: Props) {
    const t = useI18n();
    const { imgFileURL, onCloseDialog, openCropper, setCroppedArea } = hooks;

    return (
        <BootstrapDialog
            open={openCropper}
            handleClose={onCloseDialog}
            maxWidth='md'
            action={
                <>
                    <Button onClick={onCloseDialog}>
                        {t('button.cancel')}
                    </Button>
                    <Button onClick={onSave} disabled={isLoading}>
                        {t('button.save')}
                    </Button>
                </>
            }
        >
            <Box className='min-h-[50vh] relative'>
                <ImageCropper
                    imageURL={imgFileURL}
                    aspect={aspectRatio}
                    onCropComplete={(_croppedArea, croppedAreaPixels) => {
                        setCroppedArea(croppedAreaPixels);
                    }}
                />
            </Box>
        </BootstrapDialog>
    );
}
