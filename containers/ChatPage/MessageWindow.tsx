import React, { useRef, useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import { Box, Chip, Divider } from '@mui/material';
import { getDateLabel } from '@/utils/helper';
import {
    AutoSizer,
    List,
    CellMeasurer,
    CellMeasurerCache,
} from 'react-virtualized';
import { GridCoreProps } from 'react-virtualized/dist/es/Grid';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';
import { useScopedI18n } from '@/locales/client';
import { ChatDataInterface } from '@/types/api/responses/chat-data.interface';

const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50,
});

type Props = {
    messages: ChatDataInterface[];
};

export default function MessageWindow({ messages }: Props) {
    const t = useScopedI18n('date');
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
            ? t(eLabel)
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
                                <Divider className='pt-2'>
                                    {getFormatDateLabel(item.created_at)}
                                </Divider>
                                <MessageBox
                                    name={item.name}
                                    username={item.username}
                                    body={item.body}
                                    createdAt={item.created_at}
                                    distance={item.distance}
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
                            />
                        </div>
                    );
                }}
            </CellMeasurer>
        );
    }

    return (
        <>
            {topRow && (
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
        </>
    );
}
