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
import SimplePost from '@/containers/Post/View/SimplePost';
import PostSkeleton from '@/components/skeleton/Post';
import NoData from '@/components/skeleton/NoData';
import { PostStatInterface } from '@/types/api/responses/post-stat.interface';

const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 100,
});

type Props = {
    posts: MapPostDataInterface[];
    userLocation: MyLocation | null;
    isLoading?: boolean;
    onChangeStats?: (stats: PostStatInterface, reactionId: string) => void;
};

export default function PostWindow({
    posts,
    userLocation,
    isLoading,
    onChangeStats,
}: Props) {
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
                    const item = posts[index];

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
                            <SimplePost
                                post={item}
                                userLocation={userLocation}
                                onChangeStats={onChangeStats}
                            />
                        </div>
                    );
                }}
            </CellMeasurer>
        );
    }

    return (
        <>
            {posts.length === 0 && !isLoading && <NoData />}
            {isLoading && <PostSkeleton />}
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
