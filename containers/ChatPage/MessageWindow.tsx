import React, { useRef, useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import { ListChatInterface } from '@/types/list-chat.interface';
import { Box, Chip, Divider } from '@mui/material';
import { formatDateTime, getDateLabel } from '@/utils/helper';
import {
    AutoSizer,
    List,
    CellMeasurer,
    CellMeasurerCache,
} from 'react-virtualized';
import { GridCoreProps } from 'react-virtualized/dist/es/Grid';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50,
});

type Props = {
    messages: ListChatInterface[];
};

export default function MessageWindow({ messages }: Props) {
    const listRef = useRef<List>(null);
    const [topRow, setTopRow] = useState<ListChatInterface | null>(null);

    // Scroll to the bottom of the list when messages change
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToRow(messages.length - 1);
        }
    }, [messages]);

    let currentDate: string = '';

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
                {() => {
                    const item = messages[index];

                    const itemDate = formatDateTime(
                        item.created_at,
                        'YYYY-MM-DD',
                    );
                    const isNewDate = currentDate !== itemDate;
                    if (isNewDate) {
                        currentDate = itemDate;
                        return (
                            <Box key={index} style={style}>
                                <Divider className='pt-2'>
                                    {getDateLabel(item.created_at)}
                                </Divider>
                                <MessageBox
                                    name={item.name}
                                    username={item.username}
                                    body={item.body}
                                    createdAt={item.created_at}
                                />
                            </Box>
                        );
                    }

                    return (
                        <MessageBox
                            key={index}
                            name={item.name}
                            username={item.username}
                            body={item.body}
                            createdAt={item.created_at}
                            style={style}
                        />
                    );
                }}
            </CellMeasurer>
        );
    }

    return (
        <>
            {topRow && (
                <Box className='absolute top-0 text-center z-10 w-full'>
                    <Chip label={getDateLabel(topRow.created_at)} />
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
