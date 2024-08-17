import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';

export default function ChatSkeleton({ row }: { row?: number }) {
    const listRow = Array.from({ length: row || 1 }, (_, i) => i);
    return (
        <Card>
            {listRow.map((idx) => {
                return (
                    <CardHeader
                        key={idx}
                        avatar={
                            <Skeleton
                                animation='wave'
                                variant='circular'
                                width={40}
                                height={40}
                            />
                        }
                        title={
                            <Skeleton
                                animation='wave'
                                height={15}
                                width='40%'
                                style={{ marginBottom: 4 }}
                            />
                        }
                        subheader={
                            <Skeleton
                                animation='wave'
                                height={20}
                                width='80%'
                            />
                        }
                    />
                );
            })}
        </Card>
    );
}
