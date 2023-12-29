import {
    Autocomplete,
    Badge,
    Fab,
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
                <Fab
                    aria-label='edit'
                    size='medium'
                    onClick={() => toast('Wow so easy!')}
                >
                    <AddLocationAltOutlined />
                </Fab>
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
