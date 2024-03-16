import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
} from '@mui/material';
import SocialMediaPost, { SocialMediaURLType } from './SocialMediaPost';
import { useI18n } from '@/locales/client';
import ImageVideoUploadStandard, {
    TheFileType,
} from '@/components/input/FileUpload/ImageVideoUploadStandard';
import { MAX_LENGTH } from '@/utils/constant';
import { useState } from 'react';

const MaxLength = MAX_LENGTH.POST.STANDARD;

type InputDataType = {
    title: string;
    body: string;
};

type Props = {
    valueSocialMediaURL: SocialMediaURLType;
    onChangeSocialMediaURL: (val: SocialMediaURLType) => void;
    valueInputData: InputDataType;
    onChangeInputData: (val: InputDataType) => void;
    onChangeInputFiles: (val: TheFileType[]) => void;
};

export default function StandardPost({
    valueSocialMediaURL,
    onChangeSocialMediaURL,
    valueInputData,
    onChangeInputData,
    onChangeInputFiles,
}: Props) {
    const t = useI18n();
    const [showField, setShowField] = useState({
        title: false,
        media: false,
        socialMediaPost: false,
    });

    return (
        <>
            <Stack spacing={2}>
                {showField.title && (
                    <TextField
                        label={t('post.title_optional')}
                        variant='outlined'
                        fullWidth
                        value={valueInputData.title}
                        onChange={(e) => {
                            const eVal = e.target.value;
                            if (eVal.length > MaxLength.TITLE) return;
                            onChangeInputData({
                                title: e.target.value,
                                body: valueInputData.body,
                            });
                        }}
                    />
                )}

                <TextField
                    fullWidth
                    minRows={4}
                    placeholder={t('post.what_do_you_want_to_share_today')}
                    multiline
                    maxRows={16}
                    value={valueInputData.body}
                    onChange={(e) => {
                        const eVal = e.target.value;
                        if (eVal.length > MaxLength.BODY) return;
                        onChangeInputData({
                            title: valueInputData.title,
                            body: e.target.value,
                        });
                    }}
                />

                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showField.title}
                                onChange={(e) =>
                                    setShowField((oldState) => ({
                                        ...oldState,
                                        title: e.target.checked,
                                    }))
                                }
                            />
                        }
                        label={t('post.title')}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showField.media}
                                onChange={(e) => {
                                    const eChecked = e.target.checked;
                                    setShowField((oldState) => ({
                                        ...oldState,
                                        media: eChecked,
                                    }));
                                    if (!eChecked) {
                                        onChangeInputFiles([]);
                                    }
                                }}
                            />
                        }
                        label={t('post.media')}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showField.socialMediaPost}
                                onChange={(e) =>
                                    setShowField((oldState) => ({
                                        ...oldState,
                                        socialMediaPost: e.target.checked,
                                    }))
                                }
                            />
                        }
                        label={t('post.url.social_media_post')}
                    />
                </FormGroup>

                {showField.media && (
                    <ImageVideoUploadStandard
                        maxFile={MaxLength.MAX_FILE}
                        onFilesChange={(files) => onChangeInputFiles(files)}
                    />
                )}

                {showField.socialMediaPost && (
                    <SocialMediaPost
                        defaultOpen
                        value={valueSocialMediaURL}
                        onChange={(val) => onChangeSocialMediaURL(val)}
                    />
                )}
            </Stack>
        </>
    );
}
