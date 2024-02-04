import {
    extractUsernameFromEmail,
    formatDateTime,
    nameToInitial,
    stringToColor,
} from '@/utils/helper';
import {
    Avatar,
    Box,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

type Props = {
    username: string;
    name: string;
    body: string;
    createdAt: string;
    style?: React.CSSProperties;
};

export default function MessageBox({
    username,
    name,
    body,
    createdAt,
    style,
}: Props) {
    return (
        <Box style={style}>
            <ListItem className='!items-start'>
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
                    primary={extractUsernameFromEmail(username)}
                    primaryTypographyProps={{
                        className: '!text-sm ',
                    }}
                    secondary={
                        <>
                            <Typography
                                component='p'
                                variant='body2'
                                className='block break-all whitespace-pre-line'
                            >
                                {body}
                            </Typography>

                            <Typography
                                component='time'
                                variant='caption'
                                className='text-right !text-xs !-mt-1.5 block'
                            >
                                {formatDateTime(createdAt, 'HH:mm')}
                            </Typography>
                        </>
                    }
                    secondaryTypographyProps={{
                        component: 'div',
                    }}
                />
            </ListItem>
            <Divider />
        </Box>
    );
}
