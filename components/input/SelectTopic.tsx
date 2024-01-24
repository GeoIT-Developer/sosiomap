import { TopicType, useActiveTopic } from '@/hooks/useTopic';
import { useI18n } from '@/locales/client';
import {
    Autocomplete,
    Avatar,
    Box,
    Icon,
    InputLabel,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
    showLabel?: boolean;
    selectedTopic: TopicType | null;
    onSelectTopic: (_args: TopicType | null) => void;
    size?: 'small' | 'medium';
    className?: string;
    labelClass?: string;
    initialValue?: string;
    disableClearable?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
};

export default function SelectTopic({
    showLabel = true,
    selectedTopic,
    onSelectTopic,
    size = 'medium',
    className = 'my-4 mx-4',
    labelClass = 'mx-4',
    initialValue,
    disableClearable,
    disabled,
    readOnly,
}: Props) {
    const t = useI18n();
    const activeTopic = useActiveTopic();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (initialValue) {
            const eTopic = activeTopic.find((item) => item.id === initialValue);
            if (eTopic) {
                onSelectTopic(eTopic);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue, activeTopic]);

    return (
        <>
            {showLabel && (
                <InputLabel className={labelClass}>
                    {t('post.choose_topic')}
                </InputLabel>
            )}
            <Autocomplete
                size={size}
                className={className}
                value={selectedTopic}
                onChange={(_e, val) => onSelectTopic(val)}
                inputValue={inputValue}
                onInputChange={(_e, val) => setInputValue(val)}
                options={activeTopic}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => value.id === option.id}
                groupBy={(option) => option.group}
                disableClearable={selectedTopic !== null && disableClearable}
                disabled={disabled}
                renderOption={(props, option) => {
                    // @ts-ignore
                    const { key, ...otherProps } = props;
                    return (
                        <Box
                            key={option.id}
                            component='li'
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...otherProps}
                        >
                            <Avatar
                                className='mr-2'
                                sx={{ bgcolor: option.bgColor }}
                            >
                                {typeof option.icon === 'string' ? (
                                    <Icon>{option.icon}</Icon>
                                ) : (
                                    option.icon
                                )}
                            </Avatar>
                            {option.label}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={t('post.choose_topic')}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                            readOnly: readOnly,
                        }}
                    />
                )}
            />
        </>
    );
}
