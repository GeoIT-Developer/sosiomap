import MyImage from './MyImage';

type Props = {
    className?: string;
    color?: 'default' | 'white' | 'black' | 'gray';
};

export default function MyLogo({
    className = 'h-8',
    color = 'default',
}: Props) {
    const filter =
        color === 'white'
            ? 'invert(1) sepia(0) saturate(0) brightness(10) grayscale(1)'
            : color === 'black'
              ? 'brightness(0) contrast(100%)'
              : color === 'gray'
                ? 'grayscale(100%)'
                : '';

    return (
        <MyImage
            src='/img/logo/logo.svg'
            alt='logo'
            className={className}
            style={{ filter }}
        />
    );
}
