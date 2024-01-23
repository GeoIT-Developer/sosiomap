import { Button, Stack, TextField } from '@mui/material';
import SocialMediaPost, {
    SocialMediaURLType,
    initialSocialMediaURLType,
} from './SocialMediaPost';
import { useState } from 'react';
import { useI18n } from '@/locales/client';
import ImageVideoUploadStandard, {
    TheFileType,
} from '@/components/input/FileUpload/ImageVideoUploadStandard';
import { MAX_LENGTH } from '@/utils/constant';

const MaxLength = MAX_LENGTH.POST.STANDARD;

export default function StandardPost() {
    const t = useI18n();
    const [socialMediaURL, setSocialMediaURL] = useState<SocialMediaURLType>(
        initialSocialMediaURLType,
    );
    const [inputData, setInputData] = useState({
        title: '',
        body: '',
    });
    const [inputFiles, setInputFiles] = useState<TheFileType[]>([]);
    return (
        <>
            <Stack spacing={2}>
                <TextField
                    label={t('post.title_optional')}
                    variant='outlined'
                    fullWidth
                    value={inputData.title}
                    onChange={(e) => {
                        const eVal = e.target.value;
                        if (eVal.length > MaxLength.TITLE) return;
                        setInputData((oldState) => ({
                            ...oldState,
                            title: e.target.value,
                        }));
                    }}
                />
                <TextField
                    fullWidth
                    minRows={4}
                    placeholder={t('post.what_do_you_want_to_share_today')}
                    multiline
                    maxRows={16}
                    value={inputData.body}
                    onChange={(e) => {
                        const eVal = e.target.value;
                        if (eVal.length > MaxLength.BODY) return;
                        setInputData((oldState) => ({
                            ...oldState,
                            body: e.target.value,
                        }));
                    }}
                />
                <ImageVideoUploadStandard
                    maxFile={MaxLength.MAX_FILE}
                    onFilesChange={(files) => setInputFiles(files)}
                />
                <SocialMediaPost
                    value={socialMediaURL}
                    onChange={(val) => setSocialMediaURL(val)}
                />
                <Button
                    variant='contained'
                    onClick={() =>
                        console.log(inputData, inputFiles, socialMediaURL)
                    }
                >
                    Send
                </Button>
            </Stack>
        </>
    );
}
