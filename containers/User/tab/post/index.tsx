import { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API from '@/configs/api';
import { MapPostDataInterface } from '@/types/api/responses/map-post-data.interface';
import PostContent from '@/containers/ProfilePage/tab/post/Content';

export default function PostTab({ username }: { username: string }) {
    const [listMapPost, setListMapPost] = useState<MapPostDataInterface[]>([]);

    const apiQueryPost = useAPI<ObjectLiteral, string, MapPostDataInterface[]>(
        API.getUserPosts,
        {
            listkey: 'data',
            onSuccess: (_raw, res) => {
                setListMapPost(res?.list || []);
            },
        },
    );

    useEffect(() => {
        if (!username) return;
        apiQueryPost.call(username);
    }, [username]);

    return (
        <PostContent
            isLoading={apiQueryPost.loading}
            listMapPost={listMapPost}
            setListMapPost={setListMapPost}
        />
    );
}
