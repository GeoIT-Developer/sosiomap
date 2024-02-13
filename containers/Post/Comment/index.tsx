'use client';

import { Box, Button, CircularProgress, Stack } from '@mui/material';
import NeedLogin from '@/components/auth/NeedLogin';
import { useI18n } from '@/locales/client';
import { useState } from 'react';
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

type Props = {
    postId: string;
};

export default function CommentPage({ postId }: Props) {
    const t = useI18n();
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

    const { list: listComment, ...apiListComment } = useAPI<
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
                setIsLoading(false);
                setInputData({
                    title: '',
                    body: '',
                });
                setInputFiles([]);
                setSocialMediaURL(initialSocialMediaURLType);
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
                setIsLoading(false);
            },
        },
    );

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
            title: inputData.title,
            body: inputData.body,
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
        apiSendComment.call(params);
    }

    return (
        <Stack spacing={2}>
            <NeedLogin>
                <SingleAccordion title={t('post.add_comment')}>
                    <StandardPost
                        valueInputData={inputData}
                        valueSocialMediaURL={socialMediaURL}
                        onChangeInputData={setInputData}
                        onChangeInputFiles={setInputFiles}
                        onChangeSocialMediaURL={setSocialMediaURL}
                    />
                    <Box className='text-end mt-4'>
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
            {apiListComment.loading && <CircularProgress />}
            {listComment?.map((item) => {
                return <CommentBox key={item._id} comment={item} />;
            })}
        </Stack>
    );
}
