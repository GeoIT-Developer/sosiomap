/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} imageSrc - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */

import { Area } from 'react-easy-crop';

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
    });

function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0,
) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return canvas;

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5,
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
        data,
        0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
        0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y,
    );

    // As Base64 string
    // return canvas.toDataURL("image/jpeg");
    return canvas;
}

export const generateDownload = async (imageSrc: string, crop: Area) => {
    if (!crop || !imageSrc) {
        return;
    }

    const canvas = await getCroppedImg(imageSrc, crop);

    canvas.toBlob(
        (blob) => {
            if (!blob) {
                console.error('Failed to convert canvas!');
                return;
            }
            const previewUrl = window.URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.download = 'image.jpeg';
            anchor.href = URL.createObjectURL(blob);
            anchor.click();

            window.URL.revokeObjectURL(previewUrl);
        },
        'image/jpeg',
        0.66,
    );
};

export const cropImage = async (
    imageSrc: string,
    crop: Area,
    quality = 0.66,
): Promise<{ file: File; url: string } | undefined> => {
    if (!crop || !imageSrc) {
        return;
    }

    const canvas = await getCroppedImg(imageSrc, crop);

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error('Failed to convert canvas!');
                    reject(new Error('Failed to convert canvas!'));
                    return;
                }

                const file = new File([blob], 'image.jpeg', {
                    type: 'image/jpeg',
                });
                const url = window.URL.createObjectURL(file);

                resolve({ file, url });
            },
            'image/jpeg',
            quality,
        );
    });
};
