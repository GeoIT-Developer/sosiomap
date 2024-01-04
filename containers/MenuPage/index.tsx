import useWindowHeight from '@/hooks/useWindowHeight';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import PageAppBar from './PageAppBar';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TrafficIcon from '@mui/icons-material/Traffic';
import ForestIcon from '@mui/icons-material/Forest';
import FloodIcon from '@mui/icons-material/Flood';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import DiscountIcon from '@mui/icons-material/Discount';
import CellTowerIcon from '@mui/icons-material/CellTower';
import {
    green,
    red,
    blue,
    amber,
    blueGrey,
    brown,
    indigo,
    yellow,
    grey,
    lime,
    deepPurple,
} from '@mui/material/colors';
import MenuButton from './MenuButton';
import usePageLoaded from '@/hooks/usePageLoaded';
import SingleAccordion from '@/components/accordion/SingleAccordion';
import FeedIcon from '@mui/icons-material/Feed';
import HideImageIcon from '@mui/icons-material/HideImage';

const PEMILU_2024 = [
    {
        label: 'DPR',
        icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
        bg_color: indigo[500],
    },
    {
        label: 'DPD',
        icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
        bg_color: indigo[500],
    },
    {
        label: 'DPRD Provinsi',
        icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
        bg_color: indigo[500],
    },
    {
        label: 'DPRD Kab/Kota',
        icon: <AccountBalanceIcon sx={{ color: 'white' }} />,
        bg_color: indigo[500],
    },
    {
        label: 'Voting',
        icon: <HowToVoteIcon sx={{ color: grey[900] }} />,
        bg_color: yellow[500],
    },
    {
        label: 'Kecurangan',
        icon: <HighlightOffIcon sx={{ color: 'white' }} />,
        bg_color: red[900],
    },
    {
        label: 'Spanduk Ilegal',
        icon: <HideImageIcon sx={{ color: 'white' }} />,
        bg_color: red[900],
    },
];

const MAIN_FEATURE = [
    {
        label: 'User Activity',
        icon: <LocalActivityIcon sx={{ color: 'white' }} />,
        bg_color: blue[500],
    },
    {
        label: 'Events',
        icon: <CelebrationIcon sx={{ color: grey[900] }} />,
        bg_color: amber[600],
    },
    {
        label: 'News',
        icon: <FeedIcon sx={{ color: 'white' }} />,
        bg_color: deepPurple[400],
    },
    {
        label: 'Traffic',
        icon: <TrafficIcon sx={{ color: 'white' }} />,
        bg_color: blueGrey[600],
    },
    {
        label: 'Environment',
        icon: <ForestIcon sx={{ color: 'white' }} />,
        bg_color: green[500],
    },
    {
        label: 'Disaster',
        icon: <FloodIcon sx={{ color: 'white' }} />,
        bg_color: brown[800],
    },
    {
        label: 'Social',
        icon: <VolunteerActivismIcon sx={{ color: 'white' }} />,
        bg_color: red[500],
    },
    {
        label: 'Public Facility',
        icon: <CellTowerIcon sx={{ color: 'white' }} />,
        bg_color: lime[900],
    },
    {
        label: 'Promo',
        icon: <DiscountIcon sx={{ color: grey[900] }} />,
        bg_color: yellow['A200'],
    },
];

export default function MenuPage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();

    const pageLoaded = usePageLoaded(show);
    if (!show && !pageLoaded) {
        return null;
    }

    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
            <Paper
                className='overflow-y-auto !rounded-none pb-4'
                style={{ height: fragmentHeightStyle }}
            >
                <Box>
                    <Divider className='py-4'>Main Topics</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 4 }}
                        className='px-4'
                    >
                        {MAIN_FEATURE.map((item, idx) => {
                            return (
                                <Grid key={idx} item xs={1}>
                                    <MenuButton
                                        label={item.label}
                                        bgColor={item.bg_color}
                                        icon={item.icon}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box className='px-2'>
                        <SingleAccordion
                            type='compact'
                            title={<Typography>&#9432; Info</Typography>}
                        >
                            <Typography variant='body2'>
                                Main Feature is a Nulla facilisi. Phasellus
                                sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                            <Box className='flex'>
                                <Typography
                                    sx={{
                                        width: '30%',
                                        flexShrink: 0,
                                        // color: 'text.secondary',
                                        fontWeight: 'bold',
                                    }}
                                    variant='body2'
                                >
                                    Users
                                </Typography>
                                <Typography variant='body2'>
                                    You are currently not an owner. You are
                                    currently not an owner. You are currently
                                    not an owner. You are currently not an owner
                                    You are currently not an owner
                                </Typography>
                            </Box>
                        </SingleAccordion>
                    </Box>
                </Box>
                <Box>
                    <Divider className='py-4'>Pemilu 2024</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 4 }}
                        className='px-4'
                    >
                        {PEMILU_2024.map((item, idx) => {
                            return (
                                <Grid key={idx} item xs={1}>
                                    <MenuButton
                                        label={item.label}
                                        bgColor={item.bg_color}
                                        icon={item.icon}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box className='px-2'>
                        <SingleAccordion
                            type='compact'
                            title={<Typography>&#9432; Info</Typography>}
                        >
                            <Typography variant='body2'>
                                Main Feature is a Nulla facilisi. Phasellus
                                sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                            <Box className='flex'>
                                <Typography
                                    sx={{
                                        width: '30%',
                                        flexShrink: 0,
                                        // color: 'text.secondary',
                                        fontWeight: 'bold',
                                    }}
                                    variant='body2'
                                >
                                    Users
                                </Typography>
                                <Typography variant='body2'>
                                    You are currently not an owner. You are
                                    currently not an owner. You are currently
                                    not an owner. You are currently not an owner
                                    You are currently not an owner
                                </Typography>
                            </Box>
                        </SingleAccordion>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
