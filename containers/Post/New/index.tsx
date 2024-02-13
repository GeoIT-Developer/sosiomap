'use client';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
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
import { useRouter, useSearchParams } from 'next/navigation';
import { QUERY, ROUTE } from '@/utils/constant';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { TopicType } from '@/hooks/useTopic';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import SelectTopic from '@/components/input/SelectTopic';
import ChooseLocationEnum from '@/types/choose-location.enum';
import {
    compressImage,
    sensorLocation,
    updateSearchParams,
} from '@/utils/helper';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { toast } from 'react-toastify';
import dayjs, { Dayjs } from 'dayjs';
import PostTypeEnum from '@/types/post-type.enum';
import StandardPost from './StandardPost';
import CarouselPost from './CarouselPost';
import SendIcon from '@mui/icons-material/Send';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { PostPostParamsInterface } from '@/types/api/params/post-post.interface';
import { useHistoryContext } from '@/contexts/HistoryContext';
import {
    SocialMediaURLType,
    initialSocialMediaURLType,
} from './SocialMediaPost';
import { TheFileType as TheFileTypeCarousel } from '@/components/input/FileUpload/ImageVideoUploadCarousel';
import { TheFileType as TheFileTypeStandard } from '@/components/input/FileUpload/ImageVideoUploadStandard';
import useGeolocation from '@/hooks/useGeolocation';

export default function NewPostPage() {
    const t = useI18n();
    const router = useRouter();
    const history = useHistoryContext();
    const geolocation = useGeolocation();
    const searchParams = useSearchParams();
    const { heightStyleAppBar } = useWindowHeight();
    const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string>(
        searchParams.get(QUERY.LOCATION) || '',
    );
    const [selectedDate, setSelectedDate] = useState<{
        startDate?: Dayjs;
        endDate?: Dayjs;
        dateTime?: Dayjs;
    } | null>({ dateTime: dayjs() });

    const [postType, setPostType] = useState<PostTypeEnum>(
        PostTypeEnum.STANDARD,
    );

    const [socialMediaURL, setSocialMediaURL] = useState<SocialMediaURLType>(
        initialSocialMediaURLType,
    );
    const [inputData, setInputData] = useState({
        title: '',
        body: '',
    });
    const [inputFiles, setInputFiles] = useState<
        (TheFileTypeCarousel | TheFileTypeStandard)[]
    >([]);

    const [isLoading, setIsLoading] = useState(false);

    const apiSendPost = useAPI<ObjectLiteral, PostPostParamsInterface>(
        API.postPost,
        {
            onSuccess: () => {
                toast.success(t('message.success.success'), {
                    theme: 'colored',
                });
                history.onBackClose();
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
                setIsLoading(false);
            },
        },
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

    async function onClickPost() {
        setIsLoading(true);

        let compressFlagError = false;
        const newComp: { file: File; idx: number; caption: string }[] = [];
        for (let i = 0; i < inputFiles.length; i++) {
            const eFile = inputFiles[i] as TheFileTypeCarousel;
            await compressImage(eFile.file)
                .then((out) => {
                    newComp.push({
                        file: out,
                        idx: i + 1,
                        caption: eFile.caption || '',
                    });
                })
                .catch((err) => {
                    toast.error(JSON.stringify(err));
                    compressFlagError = true;
                });
            if (compressFlagError) {
                setIsLoading(false);
                break;
            }
        }
        if (compressFlagError) {
            setIsLoading(false);
            return;
        }

        const params: PostPostParamsInterface = {
            post_type: postType,
            title: inputData.title,
            body: inputData.body,
            lat: 0,
            lon: 0,
            location_type: selectedLocation as ChooseLocationEnum,
            topic_id: selectedTopic?.id || '',
            url_facebook_post: socialMediaURL.facebook,
            url_twitter_post: socialMediaURL.twitter,
            url_instagram_post: socialMediaURL.instagram,
            url_tiktok_post: socialMediaURL.tiktok,
            url_youtube_post: socialMediaURL.youtube,
            url_news_website_post: socialMediaURL.news_website,
            url_other: socialMediaURL.other,
        };
        newComp.forEach((item) => {
            params[`media_${item.idx}` as 'media_1'] = item.file;
            params[`media_${item.idx}_caption` as 'media_1_caption'] =
                item.caption;
        });
        if (selectedTopic?.date?.startDate) {
            params.start_date = selectedDate?.startDate?.toISOString();
        }
        if (selectedTopic?.date?.endDate) {
            params.end_date = selectedDate?.endDate?.toISOString();
        }
        if (selectedTopic?.date?.dateTime) {
            params.end_date = selectedDate?.dateTime?.toISOString();
        }
        if (selectedLocation === ChooseLocationEnum.CHOOSE_ON_MAP) {
            params.lat = Number(searchParams.get(QUERY.LAT)) || 0;
            params.lon = Number(searchParams.get(QUERY.LON)) || 0;
        } else if (
            selectedLocation === ChooseLocationEnum.USE_APPROXIMATE_LOCATION ||
            selectedLocation === ChooseLocationEnum.USE_CURRENT_LOCATION
        ) {
            await geolocation
                .getLatestGeolocation()
                .then((loc) => {
                    if (
                        selectedLocation ===
                        ChooseLocationEnum.USE_APPROXIMATE_LOCATION
                    ) {
                        params.lat = sensorLocation(loc.latitude);
                        params.lon = sensorLocation(loc.longitude);
                    } else {
                        params.lat = loc.latitude;
                        params.lon = loc.longitude;
                    }
                })
                .catch((err) =>
                    toast.error(err, {
                        theme: 'colored',
                    }),
                );
        }
        apiSendPost.call(params);
    }

    return (
        <div>
            <BackAppBar
                title={t('post.new_post')}
                action={
                    <NeedLogin type='login'>
                        <Button
                            variant='outlined'
                            color='inherit'
                            endIcon={
                                isLoading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <SendIcon />
                                )
                            }
                            onClick={onClickPost}
                            disabled={isLoading}
                        >
                            {t('button.post')}
                        </Button>
                    </NeedLogin>
                }
            />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto'
            >
                <NeedLogin
                    className='flex items-center justify-center'
                    style={{ height: heightStyleAppBar }}
                >
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 1, md: 2 }}
                        className='px-0 py-4 md:px-4'
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

                                        {selectedTopic?.location
                                            ?.chooseOnMap && (
                                            <FormControlLabel
                                                value={
                                                    ChooseLocationEnum.CHOOSE_ON_MAP
                                                }
                                                control={<Radio />}
                                                label={
                                                    <div>
                                                        {t(
                                                            'post.choose_on_map',
                                                        )}
                                                        <br />
                                                        {`[${
                                                            searchParams.get(
                                                                QUERY.LON,
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
                                                    !searchParams.get(
                                                        QUERY.LON,
                                                    ) ||
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

                                {selectedTopic?.date?.dateTime && (
                                    <Box className='w-full mb-4'>
                                        <InputLabel className='mb-2'>
                                            {t('post.date_time')}
                                        </InputLabel>
                                        <DateTimePicker
                                            className='w-full'
                                            ampm={false}
                                            format='YYYY-MM-DD HH:mm'
                                            value={
                                                selectedDate?.dateTime || null
                                            }
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
                                            value={
                                                selectedDate?.startDate || null
                                            }
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
                                            value={
                                                selectedDate?.endDate || null
                                            }
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
                                        <ToggleButton
                                            value={PostTypeEnum.STANDARD}
                                        >
                                            {t('post.type.standard')}
                                        </ToggleButton>
                                        <ToggleButton
                                            value={PostTypeEnum.CAROUSEL}
                                        >
                                            {t('post.type.carousel')}
                                        </ToggleButton>
                                        <ToggleButton
                                            value={PostTypeEnum.CUSTOM}
                                        >
                                            {t('post.type.custom')}
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>

                                {postType === PostTypeEnum.STANDARD && (
                                    <StandardPost
                                        valueInputData={inputData}
                                        valueSocialMediaURL={socialMediaURL}
                                        onChangeInputData={setInputData}
                                        onChangeInputFiles={setInputFiles}
                                        onChangeSocialMediaURL={
                                            setSocialMediaURL
                                        }
                                    />
                                )}
                                {postType === PostTypeEnum.CAROUSEL && (
                                    <CarouselPost
                                        valueInputData={inputData}
                                        valueSocialMediaURL={socialMediaURL}
                                        onChangeInputData={setInputData}
                                        onChangeInputFiles={setInputFiles}
                                        onChangeSocialMediaURL={
                                            setSocialMediaURL
                                        }
                                    />
                                )}
                                {postType === PostTypeEnum.CUSTOM && (
                                    <Alert color='info'>
                                        {t('message.info.coming_soon')}
                                    </Alert>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </NeedLogin>
            </Box>
        </div>
    );
}
