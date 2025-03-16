import type { Metadata } from 'next';
import HomeButton from './HomeButton';

export const metadata: Metadata = {
    title: 'Offline',
};

export default function Page() {
    return (
        <div className='p-4'>
            <h1>You`re Offline</h1>
            <h2>Please check your internet connection!</h2>
            <HomeButton />
        </div>
    );
}
