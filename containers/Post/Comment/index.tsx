'use client';

import {
    Box,
    Button,
    Card,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import NeedLogin from '@/components/auth/NeedLogin';
import { useI18n } from '@/locales/client';
import { useEffect, useState } from 'react';
import { compressImage } from '@/utils/helper';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';
import API from '@/configs/api';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { TheFileType as TheFileTypeCarousel } from '@/components/input/FileUpload/ImageVideoUploadCarousel';
import { TheFileType as TheFileTypeStandard } from '@/components/input/FileUpload/ImageVideoUploadStandard';
import { PostCommentParamsInterface } from '@/types/api/params/post-comment.interface';
import { CommentDataInterface } from '@/types/api/responses/comment-data.interface';
import CommentBox from './CommentBox';
import SingleAccordion from '@/components/accordion/SingleAccordion';
import {
    SocialMediaURLType,
    initialSocialMediaURLType,
} from '../New/SocialMediaPost';
import StandardPost from '../New/StandardPost';
import SendIcon from '@mui/icons-material/Send';
import useFormattingData from '@/hooks/useFormattingData';
import useToggleVisibility from '@/hooks/useToggleVisibility';
import { sortByKey } from '@/utils';

enum SortByEnum {
    NEAREST = 'nearest',
    FARTHEST = 'farthest',
    LATEST = 'latest',
    OLDEST = 'oldest',
}

type Props = {
    postId: string;
    topicId: string;
    commentValue: number;
};

export default function CommentPage({ postId, topicId, commentValue }: Props) {
    const t = useI18n();
    const { isVisible, toggleVisibility } = useToggleVisibility();
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

    const [listComment, setListComment] = useState<CommentDataInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.LATEST);

    const apiListComment = useAPI<
        ObjectLiteral,
        string,
        CommentDataInterface[]
    >(API.getPublicComment, {
        onError: (err) => {
            toast.error(err, {
                theme: 'colored',
            });
        },
        listkey: 'data',
        callOnFirstRender: true,
        callOnFirstRenderParams: postId,
    });
    const apiSendComment = useAPI<ObjectLiteral, PostCommentParamsInterface>(
        API.postComment,
        {
            onSuccess: () => {
                apiListComment.call(postId);
                clearAllStates();
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
                setIsLoading(false);
            },
        },
    );

    function clearAllStates() {
        setIsLoading(false);
        setInputData({
            title: '',
            body: '',
        });
        setInputFiles([]);
        setSocialMediaURL(initialSocialMediaURLType);
        toggleVisibility();
    }

    async function onClickSend() {
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

        const params: PostCommentParamsInterface = {
            post_id: postId,
            topic_id: topicId,
            title: inputData.title,
            body: inputData.body,
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
        apiSendComment.call(params);
    }

    const { formattingData } = useFormattingData();

    // @ts-ignore
    const commentLabel = t('post.statistic.comments', {
        value: formattingData(commentValue),
    });

    useEffect(() => {
        const eList = apiListComment.list;
        if (!eList?.length) return;
        let newList: CommentDataInterface[] = [];
        switch (sortBy) {
            case SortByEnum.OLDEST:
                newList = sortByKey(eList, 'createdAt', 'asc');
                break;
            case SortByEnum.NEAREST:
                newList = sortByKey(eList, 'distance', 'asc');
                break;
            case SortByEnum.FARTHEST:
                newList = sortByKey(eList, 'distance', 'desc');
                break;
            default:
                newList = sortByKey(eList, 'createdAt', 'desc');
        }
        setListComment([...newList]);
    }, [sortBy, apiListComment.list]);

    return (
        <Stack spacing={1} className='mt-1 mx-1'>
            <Card
                elevation={5}
                variant='elevation'
                sx={{ borderRadius: '8px' }}
            >
                <Typography
                    component='p'
                    variant='body2'
                    className='!mt-2 text-center'
                >
                    {commentLabel}
                </Typography>
                <NeedLogin>
                    <SingleAccordion title={t('post.add_comment')} defaultOpen>
                        <Box className='max-w-xl'>
                            {isVisible ? (
                                <StandardPost
                                    valueInputData={inputData}
                                    valueSocialMediaURL={socialMediaURL}
                                    onChangeInputData={setInputData}
                                    onChangeInputFiles={setInputFiles}
                                    onChangeSocialMediaURL={setSocialMediaURL}
                                    placeholder={t(
                                        'post.add_comment_placeholder',
                                    )}
                                    minRows={2}
                                />
                            ) : (
                                <CircularProgress />
                            )}
                        </Box>
                        <Box className='text-end'>
                            <Button
                                onClick={onClickSend}
                                disabled={isLoading}
                                variant='contained'
                                endIcon={
                                    isLoading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <SendIcon />
                                    )
                                }
                            >
                                {t('button.send')}
                            </Button>
                        </Box>
                    </SingleAccordion>
                </NeedLogin>
            </Card>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                <InputLabel>{t('label.sort_by')}</InputLabel>
                <Select
                    value={sortBy}
                    size='small'
                    onChange={(e) => {
                        setSortBy(e.target.value as SortByEnum);
                    }}
                >
                    <MenuItem value={SortByEnum.LATEST}>
                        {t('label.latest')}
                    </MenuItem>
                    <MenuItem value={SortByEnum.OLDEST}>
                        {t('label.oldest')}
                    </MenuItem>
                    <MenuItem value={SortByEnum.NEAREST}>
                        {t('label.nearest')}
                    </MenuItem>
                    <MenuItem value={SortByEnum.FARTHEST}>
                        {t('label.farthest')}
                    </MenuItem>
                </Select>
            </FormControl>
            {apiListComment.loading && <CircularProgress />}
            <Stack spacing={0.5}>
                {listComment.map((item) => {
                    return <CommentBox key={item._id} comment={item} />;
                })}
            </Stack>
        </Stack>
    );
}
