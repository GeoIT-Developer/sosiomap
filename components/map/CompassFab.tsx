import { Fab } from '@mui/material';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import useDeviceOrientation from '@/hooks/useDeviceOrientation';

export default function CompassFab() {
    const { alpha } = useDeviceOrientation();
    if (!alpha) {
        return null;
    }
    return (
        <Fab color='default' aria-label='compass' size='small'>
            <ExploreOutlinedIcon
                style={{ transform: `rotate(${-45 - 90 - alpha}deg)` }}
                color='error'
            />
        </Fab>
    );
}
