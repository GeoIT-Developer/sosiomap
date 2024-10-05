import {
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import { useScopedI18n } from '@/locales/client';
import { formatDataCount } from '@/utils/helper';
import { useEffect, useMemo, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import LPButton from '@/components/button/LPButton';
import MyImage from '@/components/preview/MyImage';
import { ASSETS } from '@/utils/constant';
import { ReactionEnum } from '@/types/reaction.enum';
import { useSession } from 'next-auth/react';

export type ReactionType = 'positive' | 'negative';

type ReactionDataType = {
    label: string;
    id: string;
    type: 'positive' | 'negative';
    format: 'image' | 'text';
};

const REACTION: { [key: string]: Omit<ReactionDataType, 'label'> } = {
    LIKE: {
        id: ReactionEnum.LIKE,
        type: 'positive',
        format: 'image',
    },
    LOVE: {
        id: ReactionEnum.LOVE,
        type: 'positive',
        format: 'image',
    },
    CARE: {
        id: ReactionEnum.CARE,
        type: 'positive',
        format: 'image',
    },
    HAHA: {
        id: ReactionEnum.HAHA,
        type: 'positive',
        format: 'image',
    },
    WOW: {
        id: ReactionEnum.WOW,
        type: 'positive',
        format: 'image',
    },
    THANK_YOU: {
        id: ReactionEnum.THANK_YOU,
        type: 'positive',
        format: 'text',
    },
    CLAP: {
        id: ReactionEnum.CLAP,
        type: 'positive',
        format: 'image',
    },
    SUPPORT: {
        id: ReactionEnum.SUPPORT,
        type: 'positive',
        format: 'image',
    },
    INSIGHTFUL: {
        id: ReactionEnum.INSIGHTFUL,
        type: 'positive',
        format: 'image',
    },
    DISLIKE: {
        id: ReactionEnum.DISLIKE,
        type: 'negative',
        format: 'image',
    },
    ANGRY: {
        id: ReactionEnum.ANGRY,
        type: 'negative',
        format: 'image',
    },
    HOAX: {
        id: ReactionEnum.HOAX,
        type: 'negative',
        format: 'text',
    },
    FAKE_NEWS: {
        id: ReactionEnum.FAKE_NEWS,
        type: 'negative',
        format: 'text',
    },
    MISLEADING: {
        id: ReactionEnum.MISLEADING,
        type: 'negative',
        format: 'text',
    },
    REPORT: {
        id: ReactionEnum.REPORT,
        type: 'negative',
        format: 'image',
    },
    DANGEROUS: {
        id: ReactionEnum.DANGEROUS,
        type: 'negative',
        format: 'image',
    },
};

export const LIST_REACTION = Object.values(REACTION);

const useListReaction = (type: ReactionType) => {
    const t = useScopedI18n('post.reaction');
    const positiveReaction: ReactionDataType[] = useMemo(
        (): ReactionDataType[] => [
            {
                ...REACTION.LIKE,
                label: t('like'),
            },
            {
                ...REACTION.LOVE,
                label: t('love'),
            },
            {
                ...REACTION.CARE,
                label: t('care'),
            },
            {
                ...REACTION.HAHA,
                label: t('haha'),
            },
            {
                ...REACTION.WOW,
                label: t('wow'),
            },
            {
                ...REACTION.THANK_YOU,
                label: t('thank_you'),
            },
            {
                ...REACTION.CLAP,
                label: t('clap'),
            },
            {
                ...REACTION.SUPPORT,
                label: t('support'),
            },
            {
                ...REACTION.INSIGHTFUL,
                label: t('insightful'),
            },
        ],
        [],
    );
    const negativeReaction = useMemo(
        () => [
            {
                ...REACTION.DISLIKE,
                label: t('dislike'),
            },
            {
                ...REACTION.ANGRY,
                label: t('angry'),
            },
            {
                ...REACTION.HOAX,
                label: t('hoax'),
            },
            {
                ...REACTION.FAKE_NEWS,
                label: t('fake_news'),
            },
            {
                ...REACTION.MISLEADING,
                label: t('misleading'),
            },
            {
                ...REACTION.REPORT,
                label: t('report'),
            },
            {
                ...REACTION.DANGEROUS,
                label: t('dangerous'),
            },
        ],
        [],
    );

    return type === 'negative' ? negativeReaction : positiveReaction;
};

export const useReaction = () => {
    const [reaction, setReaction] = useState<{
        id: string;
        type: ReactionDataType | '';
        positive: number;
        negative: number;
    }>({ id: '', type: '', positive: 0, negative: 0 });

    function onChangereaction({
        id,
        type,
        negative,
        positive,
    }: {
        id: string;
        type: ReactionDataType | '';
        positive: number;
        negative: number;
    }) {
        setReaction({ id, type, negative, positive });
    }

    return [reaction, onChangereaction];
};

type Props = {
    type: ReactionType;
    value: number;
    reaction?: string | undefined | null;
    onChangeReaction?: (reactionId: string) => void;
};

export default function Reaction({
    type,
    value,
    reaction,
    onChangeReaction,
}: Props) {
    const session = useSession();
    const listReaction = useListReaction(type);
    const [selectedReaction, setSelectedReaction] =
        useState<ReactionDataType>();

    useEffect(() => {
        if (reaction) {
            const eFind = listReaction.find((item) => item.id === reaction);
            if (eFind) {
                setSelectedReaction(eFind);
            } else {
                setSelectedReaction(undefined);
            }
        }
    }, [reaction]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleAnchor = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const tFormat = useScopedI18n('unit.number');
    function formattingData(count: number | undefined) {
        const eData = formatDataCount(count);
        return `${eData.count}${eData.label ? tFormat(eData.label) : ''}`;
    }

    function onClickReaction() {
        if (selectedReaction?.id) {
            setSelectedReaction(undefined);
            if (onChangeReaction) onChangeReaction('');
        } else {
            const eReact = listReaction[0];
            setSelectedReaction(eReact);
            if (onChangeReaction) onChangeReaction(eReact.id);
        }
    }
    function onLongPressReaction(e: any) {
        handleAnchor(e);
    }

    function onChooseReaction(item: ReactionDataType) {
        setSelectedReaction(item);
        if (onChangeReaction) onChangeReaction(item.id);
        handleClose();
    }

    return (
        <>
            <LPButton
                onClick={onClickReaction}
                onLongPress={onLongPressReaction}
                longPressType='release'
                delay={350}
            >
                <IconButton
                    disabled={session.status !== 'authenticated'}
                    aria-label={type}
                    size='medium'
                    className='space-x-1'
                >
                    {type === 'positive' && !Boolean(selectedReaction?.id) && (
                        <ThumbUpOffAltIcon fontSize='inherit' />
                    )}
                    {type === 'negative' && !Boolean(selectedReaction?.id) && (
                        <ThumbDownOffAltIcon fontSize='inherit' />
                    )}
                    {selectedReaction?.id && (
                        <>
                            {selectedReaction.format === 'image' && (
                                <MyImage
                                    src={`${ASSETS.REACTION}${selectedReaction.id}.png`}
                                    height={24}
                                    width={24}
                                    alt={selectedReaction.label}
                                />
                            )}
                            {selectedReaction.format === 'text' && (
                                <span
                                    className='!font-pacifico text-xs'
                                    style={{
                                        color: 'orange',
                                    }}
                                >
                                    {selectedReaction.label}
                                </span>
                            )}
                        </>
                    )}
                    <span
                        className='text-xs'
                        style={{
                            color: selectedReaction?.id ? 'orange' : 'inherit',
                            fontWeight: selectedReaction?.id
                                ? 'bold'
                                : 'inherit',
                        }}
                    >
                        {formattingData(value)}
                    </span>
                </IconButton>
            </LPButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    className: '!py-0',
                }}
            >
                {listReaction.map((item) => {
                    return (
                        <MenuItem
                            key={item.id}
                            onClick={() => onChooseReaction(item)}
                            dense
                            sx={{ alignItems: 'end', px: '12px' }}
                            selected={selectedReaction?.id === item.id}
                        >
                            {item.format === 'image' && (
                                <>
                                    <ListItemIcon>
                                        <MyImage
                                            src={`${ASSETS.REACTION}${item.id}.png`}
                                            height={24}
                                            width={24}
                                            alt={item.label}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>{item.label}</ListItemText>
                                </>
                            )}
                            {item.format === 'text' && (
                                <span className='!font-pacifico w-full text-center'>
                                    {item.label}
                                </span>
                            )}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
