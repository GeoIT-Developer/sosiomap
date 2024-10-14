import { useMainTopic } from '@/hooks/useTopic';
import { Typography } from '@mui/material';
import { cloneElement } from 'react';

type Props = {
    topicId: string;
};

export default function TopicIcon({ topicId }: Props) {
    const mainTopic = useMainTopic();
    const thisTopic = mainTopic.find((item) => item.id === topicId);

    return (
        <>
            {thisTopic?.icon &&
                typeof thisTopic?.icon !== 'string' &&
                cloneElement(thisTopic?.icon, {
                    sx: {
                        color: thisTopic?.bgColor,
                        height: '16px',
                        width: '16px',
                        marginRight: '4px',
                    },
                })}
            <Typography className='!text-xs'>{thisTopic?.label}</Typography>
        </>
    );
}
