import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Icon,
} from '@mui/material';

type MenuButtonProps = {
    label: string;
    icon: JSX.Element | string;
    bgColor: string;
};

export default function MenuButton({ label, bgColor, icon }: MenuButtonProps) {
    return (
        <ListItemButton className='flex-col !text-center'>
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
        </ListItemButton>
    );
}
