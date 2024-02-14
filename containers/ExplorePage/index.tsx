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
import { MyLocation } from '@/hooks/useGeolocation';
import { LOCAL_STORAGE } from '@/utils/constant';
import ExploreWindow from './ExploreWindow';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useActiveTopicContext } from '../AppPage';

export default function ExplorePage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();

    const { activeTopicType } = useActiveTopicContext();
    const [locationStorage] = useLocalStorage<MyLocation | null>(
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
            setListMapPost(res?.list || []);
        },
    });

    function refreshMapPost() {
        apiQueryPost.call({
            topic_ids: activeTopicType.map((item) => item.id).join('|'),
            lat: locationStorage?.latitude || 0,
            lon: locationStorage?.longitude || 0,
        });
    }

    useEffect(() => {
        if (!show) return;
        if (!activeTopicType.length) {
            apiQueryPost.clearData();
            return;
        }
        refreshMapPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopicType, show]);

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
                    userLocation={locationStorage}
                />
            </Paper>
        </div>
    );
}
