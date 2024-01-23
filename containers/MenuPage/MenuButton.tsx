import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Icon,
    Checkbox,
} from '@mui/material';

type MenuButtonProps = {
    label: string;
    icon: JSX.Element | string;
    bgColor: string;
    checkbox?: boolean;
    checked?: boolean;
    onClick?: () => void;
};

export default function MenuButton({
    label,
    bgColor,
    icon,
    checkbox,
    checked,
    onClick,
}: MenuButtonProps) {
    return (
        <ListItemButton className='flex-col !text-center' onClick={onClick}>
            <ListItemAvatar>
                <Avatar className='mx-auto' sx={{ bgcolor: bgColor }}>
                    {typeof icon === 'string' ? <Icon>{icon}</Icon> : icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={label}
                primaryTypographyProps={{
                    className: '!text-xs ',
                }}
            />
            {checkbox && (
                <Checkbox
                    className='!absolute !right-0 !top-0 !p-0 !m-0'
                    size='small'
                    checked={checked}
                />
            )}
        </ListItemButton>
    );
}
