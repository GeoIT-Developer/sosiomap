import { Fab } from '@mui/material';
import { useRouter } from 'next/navigation';
import { QUERY, ROUTE } from '@/utils/constant';
import { TOPIC } from '@/hooks/useTopic';
import ChooseLocationEnum from '@/types/choose-location.enum';
import { blue } from '@mui/material/colors';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function NewStoryButton() {
    const router = useRouter();

    function onClickNewStory() {
        router.push(
            `${ROUTE.POST.NEW.URL}?${QUERY.LOCATION}=${ChooseLocationEnum.USE_CURRENT_LOCATION}&${QUERY.TOPIC}=${TOPIC.USER_STORIES.id}`,
        );
    }

    return (
        <>
            <Fab
                aria-label={TOPIC.USER_STORIES.id}
                size='medium'
                style={{ backgroundColor: blue[500], color: 'white' }}
                onClick={onClickNewStory}
            >
                <AddCircleOutlineOutlinedIcon />
            </Fab>
        </>
    );
}
