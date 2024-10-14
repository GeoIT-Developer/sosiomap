import {
    Box,
    FormControlLabel,
    IconButton,
    InputLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { QUERY } from '@/utils/constant';
import { useI18n } from '@/locales/client';
import { TopicType } from '@/hooks/useTopic';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SelectTopic from '@/components/input/SelectTopic';
import ChooseLocationEnum from '@/types/choose-location.enum';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
    selectedTopic: TopicType | null;
    onSelectTopic: (val: TopicType | null) => void;
    selectedDate: {
        startDate?: Dayjs;
        endDate?: Dayjs;
        dateTime?: Dayjs;
    } | null;
    setSelectedDate: React.Dispatch<
        React.SetStateAction<{
            startDate?: Dayjs;
            endDate?: Dayjs;
            dateTime?: Dayjs;
        } | null>
    >;
    selectedLocation: string;
    onChangeLocation: (val: string) => void;
};

export default function PostSetting({
    selectedTopic,
    onSelectTopic,
    selectedDate,
    setSelectedDate,
    selectedLocation,
    onChangeLocation,
}: Props) {
    const t = useI18n();
    const searchParams = useSearchParams();

    return (
        <>
            <Box className='mb-4'>
                <SelectTopic
                    size='medium'
                    selectedTopic={selectedTopic}
                    onSelectTopic={onSelectTopic}
                    labelClass='mx-0'
                    className='mt-2 mb-4'
                    initialValue={searchParams.get(QUERY.TOPIC) || undefined}
                    disableClearable
                />
                <Typography variant='body2'>
                    &#9432; {selectedTopic?.description}
                </Typography>
            </Box>
            <Box className='w-full mb-4'>
                <InputLabel>{t('post.choose_location')}</InputLabel>
                <RadioGroup
                    value={selectedLocation}
                    onChange={(_e, val) => onChangeLocation(val)}
                >
                    {selectedTopic?.location?.useCurrentLocation && (
                        <FormControlLabel
                            value={ChooseLocationEnum.USE_CURRENT_LOCATION}
                            control={<Radio />}
                            label={t('post.use_current_location')}
                        />
                    )}

                    {selectedTopic?.location?.chooseOnMap && (
                        <FormControlLabel
                            value={ChooseLocationEnum.CHOOSE_ON_MAP}
                            control={<Radio />}
                            label={
                                <div>
                                    {t('post.choose_on_map')}
                                    <br />
                                    {`[${searchParams.get(QUERY.LON) || 0}, ${
                                        searchParams.get(QUERY.LAT) || 0
                                    }]`}
                                    <IconButton
                                        color='primary'
                                        onClick={() =>
                                            toast.error(
                                                t('message.info.coming_soon'),
                                                {
                                                    theme: 'colored',
                                                },
                                            )
                                        }
                                    >
                                        <PinDropIcon />
                                    </IconButton>
                                </div>
                            }
                            disabled={
                                !searchParams.get(QUERY.LON) ||
                                !searchParams.get(QUERY.LAT)
                            }
                        />
                    )}
                    {selectedTopic?.location?.useApproximateLocation && (
                        <FormControlLabel
                            value={ChooseLocationEnum.USE_APPROXIMATE_LOCATION}
                            control={<Radio />}
                            label={t('post.use_approximate_location')}
                        />
                    )}
                </RadioGroup>
            </Box>

            {selectedTopic?.date?.dateTime && (
                <Box className='w-full mb-4'>
                    <InputLabel className='mb-2'>
                        {t('post.date_time')}
                    </InputLabel>
                    <DateTimePicker
                        className='w-full'
                        ampm={false}
                        format='YYYY-MM-DD HH:mm'
                        value={selectedDate?.dateTime || null}
                        onAccept={(val: Dayjs | null) =>
                            setSelectedDate((oldState) => ({
                                ...oldState,
                                dateTime: dayjs(val),
                            }))
                        }
                    />
                </Box>
            )}
            {selectedTopic?.date?.startDate && (
                <Box className='w-full mb-4'>
                    <InputLabel className='mb-2'>
                        {t('post.start_date')}
                    </InputLabel>
                    <DateTimePicker
                        className='w-full'
                        ampm={false}
                        format='YYYY-MM-DD HH:mm'
                        value={selectedDate?.startDate || null}
                        onAccept={(val: Dayjs | null) =>
                            setSelectedDate((oldState) => ({
                                ...oldState,
                                startDate: dayjs(val),
                            }))
                        }
                    />
                </Box>
            )}
            {selectedTopic?.date?.endDate && (
                <Box className='w-full mb-4'>
                    <InputLabel className='mb-2'>
                        {t('post.end_date')}
                    </InputLabel>
                    <DateTimePicker
                        className='w-full'
                        ampm={false}
                        format='YYYY-MM-DD HH:mm'
                        value={selectedDate?.endDate || null}
                        onAccept={(val: Dayjs | null) =>
                            setSelectedDate((oldState) => ({
                                ...oldState,
                                endDate: dayjs(val),
                            }))
                        }
                    />
                </Box>
            )}
        </>
    );
}
