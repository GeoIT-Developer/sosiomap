import API_SERVER from '@/configs/api.server';
import PostPage from '@/containers/Post/ServerSide';
import { errorResponse } from '@/utils';

export default async function Home({
    params,
}: {
    params: { post_id: string };
}) {
    let status = { code: 200, message: 'OK' };
    const post = await API_SERVER.getPost(params.post_id)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            status = {
                code: err.response.status,
                message: errorResponse(err),
            };
        });

    return (
        <main>
            <PostPage post={post} status={status} />
        </main>
    );
}
