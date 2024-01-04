import { Paper } from '@mui/material';
import PageAppBar from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import { useSession } from 'next-auth/react';
import usePageLoaded from '@/hooks/usePageLoaded';
import useAccessToken from '@/hooks/useAccessToken';

export default function ProfilePage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();
    const session = useSession();
    const accessToken = useAccessToken();
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
                <NeedLogin
                    className='flex items-center justify-center'
                    style={{ height: fragmentHeightStyle }}
                >
                    <h5>Session</h5>
                    <pre className='max-w-full'>
                        {JSON.stringify(session, undefined, 2)}
                    </pre>
                    <h5>Access Token</h5>
                    <pre className='max-w-full'>
                        {JSON.stringify(accessToken, undefined, 2)}
                    </pre>
                </NeedLogin>
            </Paper>
        </div>
    );
}
