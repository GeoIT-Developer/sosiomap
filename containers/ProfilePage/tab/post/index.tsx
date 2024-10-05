import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API from '@/configs/api';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import useAccessToken from '@/hooks/useAccessToken';
import PostContent from './Content';

export default function PostTab() {
    const accessToken = useAccessToken();
    const [listMapPost, setListMapPost] = useState<MapPostDataInterface[]>([]);

    const apiQueryPost = useAPI<ObjectLiteral, string, MapPostDataInterface[]>(
        API.getProfilePosts,
        {
            listkey: 'data',
            onSuccess: (_raw, res) => {
                setListMapPost(res?.list || []);
            },
        },
    );

    useEffect(() => {
        if (!accessToken?.sub) return;
        apiQueryPost.call();
    }, [accessToken?.sub]);

    return (
        <PostContent
            isLoading={apiQueryPost.loading}
            listMapPost={listMapPost}
            setListMapPost={setListMapPost}
        />
    );
}
