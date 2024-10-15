import {
    Box,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import SocialMediaPost, { SocialMediaURLType } from './SocialMediaPost';
import { useI18n } from '@/locales/client';
import ImageVideoUploadStandard, {
    TheFileType,
} from '@/components/input/FileUpload/ImageVideoUploadStandard';
import { MAX_LENGTH } from '@/utils/constant';
import { useState } from 'react';
import TitleIcon from '@mui/icons-material/Title';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LinkIcon from '@mui/icons-material/Link';

const MaxLength = MAX_LENGTH.POST.STANDARD;

type InputDataType = {
    title: string;
    body: string;
};

enum FieldEnum {
    TITLE = 'title',
    MEDIA = 'media',
    SOCIAL_MEDIA_POST = 'social-media-post',
}

type Props = {
    valueSocialMediaURL: SocialMediaURLType;
    onChangeSocialMediaURL: (val: SocialMediaURLType) => void;
    valueInputData: InputDataType;
    onChangeInputData: (val: InputDataType) => void;
    onChangeInputFiles: (val: TheFileType[]) => void;
    placeholder?: string;
    minRows?: number;
};

export default function StandardPost({
    valueSocialMediaURL,
    onChangeSocialMediaURL,
    valueInputData,
    onChangeInputData,
    onChangeInputFiles,
    placeholder,
    minRows = 4,
}: Props) {
    const t = useI18n();
    const [fields, setFields] = useState<FieldEnum[]>(() => []);

    const handleChangeFields = (
        _event: React.MouseEvent<HTMLElement>,
        newFields: FieldEnum[],
    ) => {
        setFields(newFields);
    };

    const showField = {
        title: fields.includes(FieldEnum.TITLE),
        media: fields.includes(FieldEnum.MEDIA),
        socialMediaPost: fields.includes(FieldEnum.SOCIAL_MEDIA_POST),
    };

    return (
        <Stack spacing={1}>
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
                minRows={minRows}
                placeholder={
                    placeholder || t('post.what_do_you_want_to_share_today')
                }
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

            <ToggleButtonGroup
                value={fields}
                onChange={handleChangeFields}
                aria-label='fields'
                size='small'
            >
                <ToggleButton value={FieldEnum.TITLE}>
                    <TitleIcon />
                </ToggleButton>
                <ToggleButton value={FieldEnum.MEDIA}>
                    <PermMediaIcon />
                </ToggleButton>
                <ToggleButton value={FieldEnum.SOCIAL_MEDIA_POST}>
                    <LinkIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            {showField.media && (
                <ImageVideoUploadStandard
                    maxFile={MaxLength.MAX_FILE}
                    onFilesChange={(files) => onChangeInputFiles(files)}
                />
            )}

            {showField.socialMediaPost && (
                <Box className='!-mx-4'>
                    <SocialMediaPost
                        defaultOpen
                        value={valueSocialMediaURL}
                        onChange={(val) => onChangeSocialMediaURL(val)}
                    />
                </Box>
            )}
        </Stack>
    );
}
