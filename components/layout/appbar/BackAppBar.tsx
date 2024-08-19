import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { ReactNode } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistoryContext } from '@/contexts/HistoryContext';

type Props = {
    title: string;
    backUrl?: string;
    action?: ReactNode;
};

export default function BackAppBar({ title, action, backUrl }: Props) {
    const history = useHistoryContext();

    function onClickBack() {
        if (window.opener) {
            window.close();
        } else {
            history.onBackClose(backUrl);
        }
    }

    return (
        <Box>
            <AppBar position='sticky' className='!bg-primary'>
                <Toolbar>
                    <IconButton
                        size='medium'
                        aria-label='theme'
                        color='inherit'
                        onClick={onClickBack}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon color='inherit' aria-label='back' />
                    </IconButton>

                    <Typography variant='h6' noWrap component='div'>
                        {title}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>{action}</Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
