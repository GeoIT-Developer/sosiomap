import { IconButton } from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import { formatDataCount } from '@/utils/helper';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

type Props = {
    value: number;
    onClick: (e: React.KeyboardEvent | React.MouseEvent) => void;
};

export default function Comments({ value, onClick }: Props) {
    const tFormat = useScopedI18n('unit.number');
    function formattingData(count: number | undefined) {
        const eData = formatDataCount(count);
        return `${eData.count}${eData.label ? tFormat(eData.label) : ''}`;
    }
    const eVal = formattingData(value);
    return (
        <IconButton
            aria-label='comment'
            size='medium'
            className='space-x-1'
            onClick={onClick}
        >
            <TextsmsOutlinedIcon fontSize='inherit' />
            <span className='text-xs'>{eVal}</span>
        </IconButton>
    );
}
