import { nameToInitial, stringToColor } from '@/utils/helper';
import { Avatar } from '@mui/material';

type Props = {
    name: string;
    photo_url?: string;
    onClick?: () => void;
};

export default function MyAvatar({ name, photo_url, ...restProps }: Props) {
    if (photo_url) {
        return (
            <Avatar
                className='border border-2 border-gray-500 border-solid cursor-pointer hover:border-primary active:border-primary'
                src={photo_url}
                {...restProps}
            />
        );
    }
    return (
        <Avatar
            sx={{
                fontWeight: 'bold',
                bgcolor: stringToColor(name),
                cursor: 'pointer',
            }}
            {...restProps}
        >
            {nameToInitial(name)}
        </Avatar>
    );
}
