/* eslint-disable @next/next/no-img-element */

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function MyImage({
    alt,
    src,
    loading = 'lazy',
    ...restProps
}: Props) {
    return <img alt={alt} src={src} loading={loading} {...restProps} />;
}
