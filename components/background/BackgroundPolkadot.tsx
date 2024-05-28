import { ReactNode } from 'react';
import { getRandomNumber } from '@/utils';

interface Props {
    children: ReactNode;
}

const randNumber = {
    dot_1: getRandomNumber(0.6, 0.8),
    dot_2: getRandomNumber(0.6, 0.8),
    dot_3: getRandomNumber(0.6, 0.8),
    dot_4: getRandomNumber(0.6, 0.8),
    size_1: getRandomNumber(20, 40),
    size_2: getRandomNumber(20, 40),
    position_1: getRandomNumber(10, 20),
    position_2: getRandomNumber(10, 20),
};

export default function BackgroundPolkadot({ children }: Props) {
    return (
        <div
            style={{
                backgroundColor: 'transparent',
                backgroundImage: `radial-gradient(var(--primary-color) ${randNumber.dot_1}px, transparent ${randNumber.dot_2}px),
                          radial-gradient(var(--primary-color) ${randNumber.dot_3}px, transparent ${randNumber.dot_4}px)`,
                backgroundSize: `${randNumber.size_1}px ${randNumber.size_2}px`,
                backgroundPosition: `0 0, ${randNumber.position_1}px ${randNumber.position_2}px`,
            }}
        >
            {children}
        </div>
    );
}
