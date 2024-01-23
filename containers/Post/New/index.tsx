'use client';

import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    Radio,
    RadioGroup,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import { useSession } from 'next-auth/react';
import useAccessToken from '@/hooks/useAccessToken';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { QUERY, ROUTE } from '@/utils/constant';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { TopicType } from '@/hooks/useTopic';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SelectTopic from '@/components/input/SelectTopic';
import ChooseLocationEnum from '@/types/choose-location.enum';
import { updateSearchParams } from '@/utils/helper';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';
import PostTypeEnum from '@/types/post-type.enum';
import StandardPost from './StandardPost';
import CarouselPost from './CarouselPost';
import SendIcon from '@mui/icons-material/Send';

export default function NewPostPage() {
    const t = useI18n();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { heightStyleAppBar } = useWindowHeight();
    const session = useSession();
    const accessToken = useAccessToken();
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string>(
        searchParams.get(QUERY.LOCATION) || '',
    );
    const [selectedDate, setSelectedDate] = useState<{
        startDate?: Dayjs;
        endDate?: Dayjs;
    } | null>(null);

    const [postType, setPostType] = useState<PostTypeEnum>(
        PostTypeEnum.STANDARD,
    );

    function onSelectTopic(val: TopicType | null) {
        setSelectedTopic(val);
        const newParams = updateSearchParams(
            searchParams,
            QUERY.TOPIC,
            val?.id,
        );
        router.push(`${ROUTE.POST.NEW.URL}${newParams}`);
    }

    function onChangeLocation(val: string) {
        setSelectedLocation(val);
        const newParams = updateSearchParams(searchParams, QUERY.LOCATION, val);
        router.push(`${ROUTE.POST.NEW.URL}${newParams}`);
    }

    function handleChangePostType(_event: any, value: PostTypeEnum) {
        if (!value) return;
        setPostType(value);
    }

    return (
        <div>
            <BackAppBar
                title={t('post.new_post')}
                action={
                    <Button
                        variant='outlined'
                        color='inherit'
                        endIcon={<SendIcon />}
                    >
                        {t('button.send')}
                    </Button>
                }
            />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto'
            >
                <Grid
                    container
                    spacing={{ xs: 2 }}
                    columns={{ xs: 1, md: 2 }}
                    className='p-4'
                >
                    <Grid item xs={1}>
                        <Paper className='p-4'>
                            <Box className='mb-4'>
                                <SelectTopic
                                    size='medium'
                                    selectedTopic={selectedTopic}
                                    onSelectTopic={onSelectTopic}
                                    labelClass='mx-0'
                                    className='mt-2 mb-4'
                                    initialValue={
                                        searchParams.get(QUERY.TOPIC) ||
                                        undefined
                                    }
                                    disableClearable
                                />
                                <Typography variant='body2'>
                                    &#9432; {selectedTopic?.description}
                                </Typography>
                            </Box>
                            <Box className='w-full mb-4'>
                                <InputLabel>
                                    {t('post.choose_location')}
                                </InputLabel>
                                <RadioGroup
                                    value={selectedLocation}
                                    onChange={(_e, val) =>
                                        onChangeLocation(val)
                                    }
                                >
                                    {selectedTopic?.location
                                        ?.useCurrentLocation && (
                                        <FormControlLabel
                                            value={
                                                ChooseLocationEnum.USE_CURRENT_LOCATION
                                            }
                                            control={<Radio />}
                                            label={t(
                                                'post.use_current_location',
                                            )}
                                        />
                                    )}

                                    {selectedTopic?.location?.chooseOnMap && (
                                        <FormControlLabel
                                            value={
                                                ChooseLocationEnum.CHOOSE_ON_MAP
                                            }
                                            control={<Radio />}
                                            label={
                                                <div>
                                                    {t('post.choose_on_map')}
                                                    <br />
                                                    {`[${
                                                        searchParams.get(
                                                            QUERY.LNG,
                                                        ) || 0
                                                    }, ${
                                                        searchParams.get(
                                                            QUERY.LAT,
                                                        ) || 0
                                                    }]`}
                                                    <IconButton
                                                        color='primary'
                                                        onClick={() =>
                                                            toast.error(
                                                                t(
                                                                    'message.info.coming_soon',
                                                                ),
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
                                                !searchParams.get(QUERY.LNG) ||
                                                !searchParams.get(QUERY.LAT)
                                            }
                                        />
                                    )}
                                    {selectedTopic?.location
                                        ?.useApproximateLocation && (
                                        <FormControlLabel
                                            value={
                                                ChooseLocationEnum.USE_APPROXIMATE_LOCATION
                                            }
                                            control={<Radio />}
                                            label={t(
                                                'post.use_approximate_location',
                                            )}
                                        />
                                    )}
                                </RadioGroup>
                            </Box>

                            {selectedTopic?.date?.start_date && (
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
                            {selectedTopic?.date?.end_date && (
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
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Paper className='p-4'>
                            <Box className='text-center mb-4'>
                                <ToggleButtonGroup
                                    color='primary'
                                    value={postType}
                                    exclusive
                                    onChange={handleChangePostType}
                                    aria-label='post_type'
                                >
                                    <ToggleButton value={PostTypeEnum.STANDARD}>
                                        {t('post.type.standard')}
                                    </ToggleButton>
                                    <ToggleButton value={PostTypeEnum.CAROUSEL}>
                                        {t('post.type.carousel')}
                                    </ToggleButton>
                                    <ToggleButton value={PostTypeEnum.CUSTOM}>
                                        {t('post.type.custom')}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            {postType === PostTypeEnum.STANDARD && (
                                <StandardPost />
                            )}
                            {postType === PostTypeEnum.CAROUSEL && (
                                <CarouselPost />
                            )}
                            {postType === PostTypeEnum.CUSTOM && (
                                <Alert color='info'>
                                    {t('message.info.coming_soon')}
                                </Alert>
                            )}

                            <NeedLogin
                                className='flex items-center justify-center'
                                // style={{ height: fragmentHeightStyle }}
                            >
                                <h5>Session</h5>
                                <pre className='max-w-full'>
                                    {JSON.stringify(session, undefined, 2)}
                                </pre>
                                <h5>Access Token</h5>
                                <pre className='max-w-full'>
                                    {JSON.stringify(accessToken, undefined, 2)}
                                </pre>
                            </NeedLogin>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Paper
            // className='overflow-y-auto !rounded-none'
            // style={{ height: heightStyleAppBar }}
            ></Paper>
        </div>
    );
}
