import { useI18n } from '@/locales/client';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { CSSProperties, ReactNode, useEffect } from 'react';

type NeedLoginReturnType = 'hide' | 'message' | 'default';

type NeedLoginProps = {
    children: ReactNode;
    type?: NeedLoginReturnType;
    className?: string;
    style?: CSSProperties;
    message?: string;
};

export default function NeedLogin({
    children,
    type = 'default',
    className = '',
    style,
    message = '',
}: NeedLoginProps) {
    const session = useSession();
    const t = useI18n();

    const onClickLogin = () => {
        signIn('keycloak');
    };

    useEffect(() => {
        if (session?.data?.error === 'RefreshAccessTokenError') {
            // Force sign in to resolve the error
            onClickLogin();
        }
    }, [session]);

    return (
        <>
            {/* <pre>{JSON.stringify(session, undefined, 2)}</pre> */}

            {session.status === 'authenticated' && children}
            {(session.status === 'loading' ||
                session.status === 'unauthenticated') && (
                <>
                    {(type === 'default' || type === 'message') && (
                        <Box className={className} style={style}>
                            <Stack
                                className='text-center items-center'
                                spacing={1}
                            >
                                {session.status === 'loading' && (
                                    <CircularProgress />
                                )}
                                {session.status === 'unauthenticated' && (
                                    <>
                                        <Typography variant='h6'>
                                            {message ||
                                                t(
                                                    'message.info.login_to_continue',
                                                )}
                                        </Typography>
                                        {type !== 'message' && (
                                            <Button
                                                variant='contained'
                                                className='w-min'
                                                onClick={onClickLogin}
                                            >
                                                {t('button.login')}
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Stack>
                        </Box>
                    )}
                </>
            )}
        </>
    );
}
