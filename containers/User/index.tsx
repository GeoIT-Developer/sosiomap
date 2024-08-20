'use client';

import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { Alert, AlertTitle, Box, Paper } from '@mui/material';
import { useI18n } from '@/locales/client';
import useWindowHeight from '@/hooks/useWindowHeight';
import { useEffect } from 'react';
import { ProfileDataInterface } from '@/types/api/responses/profile-data.interface';
import UserContent from './Content';
import SocialMediaFooter from '../AboutPage/SocialMediaFooter';

type Props = {
    user: ProfileDataInterface;
    status?: {
        code: number;
        message: string;
    };
};

export default function UserPage({ user, status }: Props) {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();

    useEffect(() => {
        document.title = t('app.name') + ' - @' + user.username;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <BackAppBar title={user.name} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto md:p-4'
            >
                <Paper
                    className='max-w-xl mx-auto flex flex-col'
                    style={{ height: heightStyleAppBar }}
                >
                    {status?.code === 200 ? (
                        <UserContent user={user} />
                    ) : (
                        <Alert severity='error'>
                            <AlertTitle>Error</AlertTitle>
                            {status?.message}
                        </Alert>
                    )}

                    <SocialMediaFooter />
                </Paper>
            </Box>
        </div>
    );
}
