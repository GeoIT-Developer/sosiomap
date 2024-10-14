import PostContent from './Content';

export default function PostTab({ username }: { username: string }) {
    return <PostContent username={username} />;
}
