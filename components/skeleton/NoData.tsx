import { Box, ListItemAvatar, ListItemText } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useScopedI18n } from '@/locales/client';

type Props = {
    label?: string;
    description?: string;
};

export default function NoData({ label, description }: Props) {
    const t = useScopedI18n('label');
    return (
        <Box className='flex-col !text-center p-4'>
            <ListItemAvatar>
                <InventoryIcon sx={{ fontSize: 'xxx-large', opacity: '0.6' }} />
            </ListItemAvatar>
            <ListItemText
                primary={label || t('no_data')}
                primaryTypographyProps={{ fontSize: 'x-large' }}
                secondary={description}
                secondaryTypographyProps={{ fontSize: 'medium' }}
            />
        </Box>
    );
}
