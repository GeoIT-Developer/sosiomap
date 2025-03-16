'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function HomeButton() {
    const router = useRouter();
    function onClickHome() {
        router.push('/');
    }
    return (
        <Button
            variant='contained'
            sx={{ textTransform: 'none' }}
            onClick={onClickHome}
            startIcon={<ArrowBackIcon />}
        >
            Back to Home
        </Button>
    );
}
