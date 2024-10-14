'use client';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    MobileStepper,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { MAX_LENGTH, QUERY, ROUTE } from '@/utils/constant';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { TopicType } from '@/hooks/useTopic';
import { useState } from 'react';
import ChooseLocationEnum from '@/types/choose-location.enum';
import {
    compressImage,
    sensorLocation,
    updateSearchParams,
} from '@/utils/helper';
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
import { showError } from '@/utils';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PostSetting from './PostSetting';

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
                setTimeout(() => {
                    if (window.opener) {
                        window.close();
                    } else {
                        history.onBackClose();
                    }
                }, 2500);
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
        if (inputData.body.length < MAX_LENGTH.POST.MIN_BODY) {
            showError(
                // @ts-ignore
                t('message.error.post_body_at_least_minimum', {
                    value: MAX_LENGTH.POST.MIN_BODY,
                }),
            );
            return;
        }
        if (postType === PostTypeEnum.CAROUSEL && inputFiles.length === 0) {
            showError(t('message.error.post_carousel_min_media'));
            return;
        }

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
            url_linkedin_post: socialMediaURL.linkedin,
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

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 2;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
                    <Box className='px-0 py-4 md:px-4 max-w-xl mx-auto'>
                        <Paper
                            className='p-4 mb-8'
                            sx={{
                                display: activeStep === 0 ? '' : 'none',
                            }}
                        >
                            <PostSetting
                                onChangeLocation={onChangeLocation}
                                onSelectTopic={onSelectTopic}
                                selectedDate={selectedDate}
                                selectedLocation={selectedLocation}
                                selectedTopic={selectedTopic}
                                setSelectedDate={setSelectedDate}
                            />
                        </Paper>

                        <Paper
                            className='p-4 mb-8'
                            sx={{
                                display: activeStep === 1 ? '' : 'none',
                            }}
                        >
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
                                    {/* <ToggleButton
                                    value={PostTypeEnum.CUSTOM}
                                >
                                    {t('post.type.custom')}
                                </ToggleButton> */}
                                </ToggleButtonGroup>
                            </Box>

                            {postType === PostTypeEnum.STANDARD && (
                                <StandardPost
                                    valueInputData={inputData}
                                    valueSocialMediaURL={socialMediaURL}
                                    onChangeInputData={setInputData}
                                    onChangeInputFiles={setInputFiles}
                                    onChangeSocialMediaURL={setSocialMediaURL}
                                />
                            )}
                            {postType === PostTypeEnum.CAROUSEL && (
                                <CarouselPost
                                    valueInputData={inputData}
                                    valueSocialMediaURL={socialMediaURL}
                                    onChangeInputData={setInputData}
                                    onChangeInputFiles={setInputFiles}
                                    onChangeSocialMediaURL={setSocialMediaURL}
                                />
                            )}
                            {postType === PostTypeEnum.CUSTOM && (
                                <Alert color='info'>
                                    {t('message.info.coming_soon')}
                                </Alert>
                            )}
                        </Paper>

                        <MobileStepper
                            className='!-mx-2'
                            variant='text'
                            steps={maxSteps}
                            position='bottom'
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    variant='outlined'
                                    size='medium'
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    {t('post.post_content')}
                                    <KeyboardArrowRight />
                                </Button>
                            }
                            backButton={
                                <Button
                                    variant='outlined'
                                    size='medium'
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                >
                                    <KeyboardArrowLeft />
                                    {t('post.post_setting')}
                                </Button>
                            }
                        />
                    </Box>
                </NeedLogin>
            </Box>
        </div>
    );
}
