import useWindowHeight from '@/hooks/useWindowHeight';
import {
    Avatar,
    Box,
    Divider,
    Grid,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import PageAppBar from './PageAppBar';
import HubIcon from '@mui/icons-material/Hub';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const PEMILU_2024 = [
    {
        label: 'Legislatif',
        icon: <AccountBalanceIcon />,
    },
    {
        label: 'Voting',
        icon: <HowToVoteIcon />,
    },
    {
        label: 'Kecurangan',
        icon: <HighlightOffIcon />,
    },
];

const MAIN_FEATURE = [
    {
        label: 'User Activity',
        icon: <HubIcon />,
    },
    {
        label: 'Events',
        icon: <HubIcon />,
    },
    {
        label: 'Traffic',
        icon: <HubIcon />,
    },
    {
        label: 'Environment',
        icon: <HubIcon />,
    },
    {
        label: 'Disaster',
        icon: <HubIcon />,
    },
    {
        label: 'Social',
        icon: <HubIcon />,
    },
];

export default function MenuPage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();
    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
            <Paper
                className='overflow-y-auto'
                style={{ height: fragmentHeightStyle }}
            >
                <Box>
                    <Divider className='py-4'>Main Feature</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        className='px-4'
                    >
                        {MAIN_FEATURE.map((item, idx) => {
                            return (
                                <Grid key={idx} item xs={1}>
                                    <ListItemButton className='flex-col !text-center'>
                                        <ListItemAvatar>
                                            <Avatar className='mx-auto'>
                                                {item.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                className: '!text-xs ',
                                            }}
                                        />
                                    </ListItemButton>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Box>
                    <Divider className='py-4'>Pemilu 2024</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        className='px-4'
                    >
                        {PEMILU_2024.map((item, idx) => {
                            return (
                                <Grid key={idx} item xs={1}>
                                    <ListItemButton className='flex-col !text-center'>
                                        <ListItemAvatar>
                                            <Avatar className='mx-auto'>
                                                {item.icon}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                className: '!text-xs ',
                                            }}
                                        />
                                    </ListItemButton>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
}
