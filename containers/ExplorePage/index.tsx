import { Paper } from '@mui/material';
import PageAppBar from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import usePageLoaded from '@/hooks/usePageLoaded';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import { GetPublicMapPostParamsInterface } from '@/types/api/params/get-public-map-post.interface';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import API from '@/configs/api';
import { useEffect, useState } from 'react';
import { useActiveTopic } from '@/hooks/useTopic';
import useLocalStorageFunc from '@/hooks/useLocalStorageFunc';
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
import ExploreWindow from './ExploreWindow';
import { addMinioPrefix } from '@/utils/helper';

export default function ExplorePage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();

    const { activeTopic, refreshTopic } = useActiveTopic();
    const locationStorage = useLocalStorageFunc<MyLocation | null>(
        LOCAL_STORAGE.LASK_KNOWN_LOCATION,
        null,
    );
    const [listMapPost, setListMapPost] = useState<MapPostDataInterface[]>([]);

    const apiQueryPost = useAPI<
        ObjectLiteral,
        GetPublicMapPostParamsInterface,
        MapPostDataInterface[]
    >(API.getPublicMapPost, {
        listkey: 'data',
        onSuccess: (_raw, res) => {
            const eList: MapPostDataInterface[] = (res?.list || []).map(
                (item) => {
                    const eMedia = item.media.map((med) => ({
                        ...med,
                        file_url: addMinioPrefix(med.file_url),
                    }));
                    return { ...item, media: eMedia };
                },
            );
            setListMapPost(eList);
        },
    });

    function refreshMapPost() {
        apiQueryPost.call({
            topic_ids: activeTopic.map((item) => item.id).join('|'),
            lat: locationStorage.getItem()?.latitude || 0,
            lon: locationStorage.getItem()?.longitude || 0,
        });
    }

    useEffect(() => {
        if (!show) return;
        if (!activeTopic.length) {
            apiQueryPost.clearData();
            return;
        }
        refreshMapPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopic, show]);

    useEffect(() => {
        if (show) {
            refreshTopic();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const pageLoaded = usePageLoaded(show);
    if (!show && !pageLoaded) {
        return null;
    }

    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
            <Paper
                className='overflow-y-auto !rounded-none'
                style={{ height: fragmentHeightStyle }}
            >
                <ExploreWindow
                    posts={listMapPost || []}
                    userLocation={locationStorage.getItem()}
                />
            </Paper>
        </div>
    );
}
