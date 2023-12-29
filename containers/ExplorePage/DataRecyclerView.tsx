import React, { CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { ListItem, ListItemText } from '@mui/material';

export default function DataRecyclerView({
    data,
    style,
}: {
    data: any[];
    style: CSSProperties;
}) {
    const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
        <ListItem style={style}>
            <ListItemText primary={data[index].text} />
        </ListItem>
    );

    return (
        <List
            height={400}
            width={300}
            itemCount={data.length}
            itemSize={50}
            className='!w-full'
            style={style}
        >
            {Row}
        </List>
    );
}
