type Props = {
    title: string;
    src: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
};

function getYoutubeVideoId(url: string) {
    // Regular expression to match YouTube video ID in various formats
    const regex =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Extract video ID using the regex
    const match = url.match(regex);

    // If there is a match, return the video ID, else return null
    return match ? match[1] : null;
}

export default function MyYoutube({
    title,
    src,
    className,
    style,
    width = '100%',
    height = '500',
}: Props) {
    const youtubeID = getYoutubeVideoId(src);
    return (
        <iframe
            src={youtubeID ? `https://www.youtube.com/embed/${youtubeID}` : src}
            width={width}
            height={height}
            className={className}
            style={style}
            title={title}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
        />
    );
}
