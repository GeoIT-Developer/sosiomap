import API_SERVER from '@/configs/api.server';
import UserPage from '@/containers/User';
import { errorResponse } from '@/utils';

export default async function Home({
    params,
}: {
    params: { username: string };
}) {
    let status = { code: 200, message: 'OK' };
    const user = await API_SERVER.getUser(params.username)
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
            <UserPage user={user} status={status} />
        </main>
    );
}
