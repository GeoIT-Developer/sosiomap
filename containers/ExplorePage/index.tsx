import { Paper } from '@mui/material';
import PageAppBar from './PageAppBar';
import useWindowHeight from '@/hooks/useWindowHeight';
import DataRecyclerView from './DataRecyclerView';
import usePageLoaded from '@/hooks/usePageLoaded';

const generateSampleData = () => {
    const data = [];
    for (let i = 1; i <= 100; i++) {
        data.push({ id: i, text: `Item ${i}` });
    }
    return data;
};

const sampleData = generateSampleData();

export default function ExplorePage({ show = true }: { show?: boolean }) {
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
                <DataRecyclerView
                    data={sampleData}
                    style={{ height: fragmentHeightStyle }}
                />
            </Paper>
        </div>
    );
}
