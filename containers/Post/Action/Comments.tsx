import { IconButton } from '@mui/material';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import useFormattingData from '@/hooks/useFormattingData';

type Props = {
    value: number;
    onClick?: (e: React.KeyboardEvent | React.MouseEvent) => void;
};

export default function Comments({ value, onClick }: Props) {
    const { formattingData } = useFormattingData();
    return (
        <IconButton
            aria-label='comment'
            size='medium'
            className='space-x-1'
            onClick={onClick}
        >
            <TextsmsOutlinedIcon fontSize='inherit' />
            <span className='text-xs'>{formattingData(value)}</span>
        </IconButton>
    );
}
