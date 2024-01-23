import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

type Props = {
    accept?: string;
    acceptType?: 'image' | 'pdf' | 'video';
    className?: string;
    label: string;
    icon?: JSX.Element;
};

export default function FileUpload({
    accept = '',
    label,
    icon,
    className = '',
    acceptType,
}: Props) {
    const eAccept =
        acceptType === 'image'
            ? 'image/*'
            : // ? 'image/jpeg, image/png, image/gif, image/heic, image/heif'
              acceptType === 'video'
              ? 'video/*'
              : //   ? 'video/mp4, video/webm, video/ogg'
                acceptType === 'pdf'
                ? 'application/pdf'
                : accept;
    return (
        <Button
            component='label'
            variant='contained'
            startIcon={icon}
            className={className}
        >
            {label}
            <VisuallyHiddenInput type='file' accept={eAccept} />
        </Button>
    );
}
