import { IconButton, Tooltip } from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { QUERY, ROUTE } from '@/utils/constant';
import { useRouter } from 'next/navigation';
import { LIST_ROUTE } from '@/containers/AppPage/BottomNavBar';
import { useHashRouterContext } from '@/contexts/HashRouterContext';

type Props = {
    post: MapPostDataInterface;
};

export default function FlyTo({ post }: Props) {
    const t = useScopedI18n('post');
    const router = useRouter();
    const { setHashRouter } = useHashRouterContext();

    function onClickFlyTo() {
        const newParams = new URLSearchParams();
        newParams.set(QUERY.LON, String(post.location.coordinates[0]));
        newParams.set(QUERY.LAT, String(post.location.coordinates[1]));
        newParams.set(QUERY.FLY_TO, post._id);
        setHashRouter(LIST_ROUTE.HOME);
        const theURL = `${ROUTE.HOME.URL}?${newParams.toString()}`;
        router.push(theURL);
    }

    return (
        <Tooltip placement='top' arrow title={t('fly_to')}>
            <IconButton
                aria-label={t('fly_to')}
                size='medium'
                onClick={onClickFlyTo}
            >
                <FlightTakeoffRoundedIcon fontSize='inherit' />
            </IconButton>
        </Tooltip>
    );
}
