import {
    Autocomplete,
    Avatar,
    Badge,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    TextField,
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import BasemapDrawer from '@/components/map/BasemapDrawer';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import SensorsIcon from '@mui/icons-material/Sensors';
import AddLocationAltOutlined from '@mui/icons-material/AddLocationAltOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SimpleDialog from '@/components/dialog/SimpleDialog';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PolylineIcon from '@mui/icons-material/Polyline';

export default function HomePage() {
    return (
        <>
            <Stack
                spacing={1}
                direction='row'
                className='absolute z-10 top-4 left-[1rem] w-[calc(100%-2rem)]'
            >
                <Paper className='!rounded-full flex-grow'>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        options={[].map((item) => item)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    className: '!rounded-full w-auto',
                                    startAdornment: <SearchIcon className='' />,
                                }}
                                placeholder='Search'
                            />
                        )}
                        size='small'
                    />
                </Paper>
                <Fab
                    aria-label='notification'
                    size='small'
                    className='flex-shrink'
                >
                    <Badge badgeContent={2} color='error'>
                        <NotificationsIcon />
                    </Badge>
                </Fab>
            </Stack>

            <Stack spacing={1} className='absolute z-10 top-20 left-4'>
                <BasemapDrawer />
                <Fab color='default' aria-label='edit' size='small'>
                    <LayersIcon />
                </Fab>
            </Stack>

            <Stack spacing={2} className='absolute z-10 bottom-4 right-4'>
                <SimpleDialog
                    title='Create New POI'
                    triggerButton={
                        <Fab
                            aria-label='edit'
                            size='medium'
                            // onClick={() => toast('Wow so easy!')}
                        >
                            <AddLocationAltOutlined />
                        </Fab>
                    }
                >
                    <List sx={{ pt: 0 }}>
                        <ListItem disableGutters>
                            <ListItemButton
                                autoFocus
                                // onClick={() =>
                                //     handleListItemClick('addAccount')
                                // }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <GpsFixedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={'Use My current Location'}
                                />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemButton
                                autoFocus
                                // onClick={() =>
                                //     handleListItemClick('addAccount')
                                // }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PinDropIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'Choose on Map'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemButton
                                autoFocus
                                // onClick={() =>
                                //     handleListItemClick('addAccount')
                                // }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PolylineIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={'Draw on Map'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </SimpleDialog>

                <Fab
                    color='primary'
                    aria-label='edit'
                    size='medium'
                    onClick={() =>
                        toast.error('ERRR', {
                            theme: 'colored',
                        })
                    }
                >
                    <SensorsIcon />
                </Fab>
            </Stack>
        </>
    );
}
