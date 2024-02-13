import {
    AutoSizer,
    List,
    CellMeasurer,
    CellMeasurerCache,
} from 'react-virtualized';
import { GridCoreProps } from 'react-virtualized/dist/es/Grid';
import { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import { MyLocation } from '@/hooks/useGeolocation';
import SimplePost from '../Post/View/SimplePost';

const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 100,
});

type Props = {
    posts: MapPostDataInterface[];
    userLocation: MyLocation | null;
};

export default function ExploreWindow({ posts, userLocation }: Props) {
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
                    const item = posts[index];

                    return (
                        <SimplePost
                            key={index}
                            post={item}
                            userLocation={userLocation}
                            style={style}
                        />
                    );
                }}
            </CellMeasurer>
        );
    }

    return (
        <>
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        rowCount={posts.length}
                        rowRenderer={RowRenderer}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        width={width}
                    />
                )}
            </AutoSizer>
        </>
    );
}
