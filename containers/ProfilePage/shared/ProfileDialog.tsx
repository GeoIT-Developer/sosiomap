import { ReactElement } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import SimpleDialog from '@/components/dialog/SimpleDialog';
import { nameToImage, stringToColor } from '@/utils/helper';
import { ROUTE } from '@/utils/constant';

type Props = {
    children: ReactElement;
    username: string;
    name: string;
    photo_url?: string;
};

export default function ProfileDialog({
    children,
    name,
    username,
    photo_url,
}: Props) {
    const t = useScopedI18n('profile');

    function onClickSeeProfile() {
        window.open(ROUTE.USER.DETAIL.setURL(username), '_blank');
    }
    return (
        <SimpleDialog triggerButton={children}>
            <Card sx={{ width: 250 }}>
                <Box sx={{ position: 'relative' }}>
                    {photo_url ? (
                        <CardMedia
                            sx={{ height: 250 }}
                            image={photo_url}
                            title={name}
                        />
                    ) : (
                        <CardMedia
                            sx={{ height: 250 }}
                            image={nameToImage(name, stringToColor(name))}
                            title={name}
                        />
                    )}

                    <CardContent className='text-center !p-1 absolute bottom-0 w-full bg-black bg-opacity-65'>
                        <Typography variant='body1' className='text-white'>
                            {name}
                        </Typography>
                        <Typography
                            variant='body2'
                            className='opacity-80 text-white'
                        >
                            @{username}
                        </Typography>
                    </CardContent>
                </Box>

                <CardActions className='text-center justify-center'>
                    <Button
                        variant='outlined'
                        size='small'
                        sx={{ textTransform: 'none' }}
                        onClick={onClickSeeProfile}
                    >
                        {t('see_profile')}
                    </Button>
                </CardActions>
            </Card>
        </SimpleDialog>
    );
}
