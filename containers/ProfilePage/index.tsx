import { Paper } from '@mui/material';
import PageAppBar from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import NeedLogin from '@/components/auth/NeedLogin';
import usePageLoaded from '@/hooks/usePageLoaded';
import SocialMediaFooter from '../AboutPage/SocialMediaFooter';
import ProfileContent from './Content';

export default function ProfilePage({ show = true }: { show?: boolean }) {
    const { fragmentHeightStyle } = useWindowHeight();
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
                    <ProfileContent />
                </NeedLogin>
                <SocialMediaFooter />
            </Paper>
        </div>
    );
}
