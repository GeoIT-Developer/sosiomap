import { nameToInitial, stringToColor } from '@/utils/helper';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

type Props = {
    username: string;
    name: string;
    body: string;
    createdAt: string;
};

export default function MessageBox({ username, name, body, createdAt }: Props) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar
                    sx={{
                        fontWeight: 'bold',
                        bgcolor: stringToColor(name),
                    }}
                >
                    {nameToInitial(name)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={body}
                primaryTypographyProps={{
                    className: '!text-base ',
                }}
                secondary={createdAt}
                secondaryTypographyProps={{
                    className: '!text-xs ',
                }}
            />
        </ListItem>
    );
}
