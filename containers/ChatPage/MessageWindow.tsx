import React, { useRef, useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import { Box, Chip } from '@mui/material';
import { getDateLabel } from '@/utils/helper';
import {
    AutoSizer,
    List,
    CellMeasurer,
    CellMeasurerCache,
} from 'react-virtualized';
import { GridCoreProps } from 'react-virtualized/dist/es/Grid';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';
import { useI18n } from '@/locales/client';
import { ChatDataInterface } from '@/types/api/responses/chat-data.interface';
import NoData from '@/components/skeleton/NoData';
import ChatSkeleton from '@/components/skeleton/Chat';

const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50,
});

type Props = {
    messages: ChatDataInterface[];
    isLoading?: boolean;
};

export default function MessageWindow({ messages, isLoading }: Props) {
    const t = useI18n();
    const listRef = useRef<List>(null);
    const [topRow, setTopRow] = useState<ChatDataInterface | null>(null);

    // Scroll to the bottom of the list when messages change
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToRow(messages.length - 1);
        }
    }, [messages]);

    function getFormatDateLabel(eDate: string) {
        const eLabel = eDate ? getDateLabel(eDate) : '';
        return eLabel === 'today' || eLabel === 'yesterday'
            ? t(`date.${eLabel}`)
            : eLabel;
    }

    function RowRenderer({
        index,
        key,
        parent,
        style,
    }: {
        index: number;
        key: string;
        parent: React.Component<GridCoreProps> & MeasuredCellParent;
        style: React.CSSProperties;
    }) {
        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
            >
                {({ registerChild }) => {
                    const item = messages[index];
                    if (item.rootLabelDate) {
                        return (
                            <div
                                key={index}
                                style={style}
                                ref={(element): void => {
                                    if (element && registerChild) {
                                        registerChild(element);
                                    }
                                }}
                            >
                                <div className='w-full text-center'>
                                    <Chip
                                        label={getFormatDateLabel(
                                            item.created_at,
                                        )}
                                        variant='outlined'
                                    />
                                </div>
                                <MessageBox
                                    name={item.name}
                                    username={item.username}
                                    body={item.body}
                                    createdAt={item.created_at}
                                    distance={item.distance}
                                    photo_url={item.photo_url}
                                />
                            </div>
                        );
                    }

                    return (
                        <div
                            ref={(element): void => {
                                if (element && registerChild) {
                                    registerChild(element);
                                }
                            }}
                            key={index}
                            style={style}
                        >
                            <MessageBox
                                name={item.name}
                                username={item.username}
                                body={item.body}
                                createdAt={item.created_at}
                                distance={item.distance}
                                photo_url={item.photo_url}
                            />
                        </div>
                    );
                }}
            </CellMeasurer>
        );
    }

    return (
        <>
            {topRow && messages.length && (
                <Box className='absolute top-0 text-center z-10 w-full'>
                    <Chip label={getFormatDateLabel(topRow.created_at)} />
                </Box>
            )}

            <AutoSizer>
                {({ height, width }) => (
                    <List
                        ref={listRef}
                        height={height}
                        rowCount={messages.length}
                        rowRenderer={RowRenderer}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        width={width}
                        onRowsRendered={(info) => {
                            if (info.startIndex === 0) {
                                setTopRow(null);
                            } else {
                                setTopRow(messages[info.startIndex]);
                            }
                        }}
                    />
                )}
            </AutoSizer>
            {isLoading && messages.length === 0 && <ChatSkeleton row={4} />}
            {messages.length === 0 && !isLoading && (
                <>
                    <NoData label={t('chat.no_chat_nearby')} />
                </>
            )}
        </>
    );
}
