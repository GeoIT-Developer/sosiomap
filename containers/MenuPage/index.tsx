import useWindowHeight from '@/hooks/useWindowHeight';
import { Box, Grid, IconButton, Paper } from '@mui/material';
import PageAppBar from './PageAppBar';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export default function MenuPage({ show = true }: { show?: boolean }) {
    console.log('AAAA');

    const { fragmentHeightStyle } = useWindowHeight();
    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
            <Paper
                className='overflow-y-auto'
                style={{ height: fragmentHeightStyle }}
            >
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {Array.from(Array(12)).map((_, index) => (
                        <Grid item xs={1} sm={4} md={4} key={index}>
                            <IconButton>
                                <InsertEmoticonIcon />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
}
