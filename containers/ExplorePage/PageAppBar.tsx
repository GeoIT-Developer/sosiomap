import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Autocomplete, TextField } from '@mui/material';
import { useI18n } from '@/locales/client';

export default function PageAppBar() {
    const t = useI18n();
    return (
        <Box>
            <AppBar position='sticky'>
                <Toolbar>
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
                                    startAdornment: <TravelExploreIcon />,
                                    className: '!text-white',
                                }}
                                placeholder={t('navigation.explore')}
                            />
                        )}
                        size='small'
                        className='w-full'
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
