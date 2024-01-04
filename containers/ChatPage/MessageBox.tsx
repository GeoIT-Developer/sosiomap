import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default function MessageBox() {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>N</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary='Hallo'
                primaryTypographyProps={{
                    className: '!text-base ',
                }}
                secondary='23-12-2023'
                secondaryTypographyProps={{
                    className: '!text-xs ',
                }}
            />
        </ListItem>
    );
}
