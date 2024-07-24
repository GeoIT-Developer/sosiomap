import { Slider } from '@mui/material';
import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

type Props = {
    imageURL: string;
    aspect?: number;
    onCropComplete?: (croppedArea: Area, croppedAreaPixels: Area) => void;
};

export default function ImageCropper({
    imageURL,
    aspect = 4 / 3,
    onCropComplete,
}: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    return (
        <div>
            <div>
                <Cropper
                    image={imageURL}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>

            <div className='absolute bottom-0 w-full max-w-[calc(100%-1rem)]'>
                <div className='max-w-[80%] mx-auto'>
                    <Slider
                        max={4}
                        min={1}
                        value={zoom}
                        onChange={(_e, val) => setZoom(val as number)}
                        step={0.1}
                    />
                </div>
            </div>
        </div>
    );
}
