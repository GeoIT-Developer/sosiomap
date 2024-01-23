type Props = {
    src: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
    type?: string;
    autoplay?: boolean;
    controls?: boolean;
};

export default function MyVideo({
    src,
    className,
    style,
    width = '100%',
    height = '500',
    type = 'video/mp4',
    autoplay = true,
    controls = true,
}: Props) {
    return (
        <video
            width={width}
            height={height}
            controls={controls}
            autoPlay={autoplay}
            className={className}
            style={style}
        >
            <source src={src} type={type} />
        </video>
    );
}
