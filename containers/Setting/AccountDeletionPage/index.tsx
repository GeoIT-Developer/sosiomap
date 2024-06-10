'use client';

import {
    Box,
    Button,
    DialogContentText,
    Divider,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import useWindowHeight from '@/hooks/useWindowHeight';
import BackAppBar from '@/components/layout/appbar/BackAppBar';
import { useI18n } from '@/locales/client';
import { useEffect, useState } from 'react';
import NeedLogin from '@/components/auth/NeedLogin';
import useAccessToken from '@/hooks/useAccessToken';
import { toast } from 'react-toastify';
import BootstrapDialog from '@/components/dialog/BootstrapDialog';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API from '@/configs/api';
import {
    RequestAccountDeletionDataInterface,
    RequestAccountDeletionStatusEnum,
} from '@/types/api/responses/request-account-deletion-data.interface';
import { getDateTimeString } from '@/utils/helper';

function isAccountDeletionRequested(
    listData: RequestAccountDeletionDataInterface[] | null,
) {
    if (
        listData?.length &&
        (listData[0].status === RequestAccountDeletionStatusEnum.WAITING ||
            listData[0].status === RequestAccountDeletionStatusEnum.REQUESTED)
    ) {
        return true;
    } else {
        return false;
    }
}

export default function AccountDeletionPage() {
    const t = useI18n();
    const { heightStyleAppBar } = useWindowHeight();

    const [inputData, setInputData] = useState({ username: '', email: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [inputPhrase, setInputPhrase] = useState('');
    const accessToken = useAccessToken();

    useEffect(() => {
        document.title =
            t('app.name') + ' - ' + t('navigation.account_deletion');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const apiPostRequest = useAPI<ObjectLiteral>(
        API.postRequestAccountDeletion,
        {
            onSuccess: () => {
                toast.success(t('message.success.success'), {
                    theme: 'colored',
                });
                apiGetRequest.call();
                onCloseDialog();
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
            },
        },
    );

    const apiPutRequest = useAPI<ObjectLiteral, string>(
        API.putRequestAccountDeletion,
        {
            onSuccess: () => {
                toast.success(t('message.success.success'), {
                    theme: 'colored',
                });
                apiGetRequest.call();
                onCloseDialog();
            },
            onError: (err) => {
                toast.error(err, {
                    theme: 'colored',
                });
            },
        },
    );

    const { list: listRequest, ...apiGetRequest } = useAPI<
        ObjectLiteral,
        null,
        RequestAccountDeletionDataInterface[]
    >(API.getRequestAccountDeletion, {
        onError: (err) => {
            toast.error(err, {
                theme: 'colored',
            });
        },
        listkey: 'data',
    });

    useEffect(() => {
        if (accessToken?.sub) {
            apiGetRequest.call();
        }
    }, [accessToken?.sub]);

    function onClickDelete() {
        if (
            String(accessToken?.email).toLowerCase() !==
                inputData.email.toLowerCase() ||
            String(accessToken?.preferred_username).toLowerCase() !==
                inputData.username.toLowerCase()
        ) {
            toast.error(t('message.error.invalid_email_or_username'), {
                theme: 'colored',
            });
        } else {
            setOpenDialog(true);
        }
    }

    function onClickWithdraw() {
        setOpenDialog(true);
    }

    function onCloseDialog() {
        setOpenDialog(false);
    }

    function onClickSubmitDeletion() {
        if (inputPhrase === t('setting.account_deletion.write_delete')) {
            apiPostRequest.call();
        } else {
            toast.error(t('setting.account_deletion.invalid_phrase'), {
                theme: 'colored',
            });
        }
    }
    function onClickSubmitWithdraw() {
        const requestId = listRequest && listRequest[0]._id;
        if (!requestId) return;
        apiPutRequest.call(requestId);
    }

    const isAccDeletionRequested = isAccountDeletionRequested(listRequest);

    return (
        <div>
            <BackAppBar title={t('navigation.account_deletion')} />
            <Box
                style={{ height: heightStyleAppBar }}
                className='overflow-y-auto p-4'
            >
                <Paper className='max-w-2xl mx-auto p-4'>
                    <Stack spacing={1}>
                        <Typography variant='h4' component='h1'>
                            {t('setting.account_deletion.title')}
                        </Typography>
                        <Typography variant='body1'>
                            {t('setting.account_deletion.desc')}
                        </Typography>
                        <Typography variant='body1'>
                            <b>{t('setting.account_deletion.title_1')}</b>
                        </Typography>
                        <List sx={{ listStyle: 'disc', pl: 2, py: 0 }}>
                            {[
                                t('setting.account_deletion.desc_1_1'),
                                t('setting.account_deletion.desc_1_2'),
                                t('setting.account_deletion.desc_1_3'),
                            ].map((item) => (
                                <ListItem
                                    key={item}
                                    sx={{
                                        display: 'list-item',
                                        pl: 0,
                                        py: 0,
                                    }}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant='body1'>
                            <b>{t('setting.account_deletion.title_2')}</b>
                        </Typography>
                        <Typography variant='body1'>
                            {t('setting.account_deletion.desc_2')}
                        </Typography>
                        <List sx={{ listStyle: 'disc', pl: 2, py: 0 }}>
                            {[
                                t('setting.account_deletion.desc_2_1'),
                                t('setting.account_deletion.desc_2_2'),
                            ].map((item) => (
                                <ListItem
                                    key={item}
                                    sx={{
                                        display: 'list-item',
                                        pl: 0,
                                        py: 0,
                                    }}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant='body1'>
                            <b>{t('setting.account_deletion.title_3')}</b>
                        </Typography>
                        <List sx={{ listStyle: 'decimal', pl: 2, py: 0 }}>
                            {[
                                t('setting.account_deletion.desc_3_1'),
                                t('setting.account_deletion.desc_3_2'),
                                t('setting.account_deletion.desc_3_3'),
                            ].map((item) => (
                                <ListItem
                                    key={item}
                                    sx={{
                                        display: 'list-item',
                                        pl: 0,
                                        py: 0,
                                    }}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant='body1'>
                            {t('setting.account_deletion.desc_4')}
                        </Typography>
                        <Divider className='!mb-4' />

                        <NeedLogin>
                            <Stack spacing={2}>
                                {isAccDeletionRequested ? (
                                    <>
                                        <Box className='w-full'>
                                            <InputLabel>
                                                {t(
                                                    'setting.account_deletion.requested_at',
                                                )}
                                            </InputLabel>
                                            <TextField
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                value={
                                                    (listRequest &&
                                                        getDateTimeString(
                                                            listRequest[0]
                                                                .createdAt,
                                                        )) ||
                                                    ''
                                                }
                                                disabled
                                            />
                                        </Box>
                                        <Box className='w-full'>
                                            <InputLabel>
                                                {t(
                                                    'setting.account_deletion.status',
                                                )}
                                            </InputLabel>
                                            <TextField
                                                variant='outlined'
                                                size='small'
                                                fullWidth
                                                value={
                                                    (listRequest &&
                                                        listRequest[0]
                                                            .status) ||
                                                    ''
                                                }
                                                disabled
                                            />
                                        </Box>
                                        <Button
                                            variant='outlined'
                                            className='w-full !mt-6'
                                            onClick={onClickWithdraw}
                                        >
                                            {t(
                                                'setting.account_deletion.button_withdraw',
                                            )}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <TextField
                                            fullWidth
                                            label={t('profile.email')}
                                            type='email'
                                            value={inputData.email}
                                            onChange={(e) => {
                                                const eVal = e.target.value;
                                                setInputData((oldState) => ({
                                                    ...oldState,
                                                    email: eVal,
                                                }));
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label={t('profile.username')}
                                            type='text'
                                            value={inputData.username}
                                            onChange={(e) => {
                                                const eVal = e.target.value;
                                                setInputData((oldState) => ({
                                                    ...oldState,
                                                    username: eVal,
                                                }));
                                            }}
                                        />
                                        <Button
                                            variant='outlined'
                                            className='w-full !mt-6'
                                            onClick={onClickDelete}
                                        >
                                            {t(
                                                'setting.account_deletion.button_delete',
                                            )}
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </NeedLogin>

                        <Divider className='!mt-4' />
                        <Typography variant='body1'>
                            {t('setting.account_deletion.desc_5')}
                        </Typography>
                    </Stack>
                </Paper>

                <BootstrapDialog
                    title={
                        isAccDeletionRequested
                            ? t('setting.account_deletion.button_withdraw')
                            : t('setting.account_deletion.button_delete')
                    }
                    open={openDialog}
                    handleClose={onCloseDialog}
                    maxWidth='sm'
                    action={
                        <>
                            <Button onClick={onCloseDialog}>
                                {t('button.close')}
                            </Button>
                            <Button
                                onClick={
                                    isAccDeletionRequested
                                        ? onClickSubmitWithdraw
                                        : onClickSubmitDeletion
                                }
                            >
                                {t('button.submit')}
                            </Button>
                        </>
                    }
                >
                    {isAccDeletionRequested ? (
                        <>
                            <DialogContentText>
                                {t(
                                    'setting.account_deletion.withdraw_request_desc',
                                )}
                            </DialogContentText>
                        </>
                    ) : (
                        <>
                            <DialogContentText>
                                {t(
                                    'setting.account_deletion.write_delete_desc',
                                    // @ts-ignore
                                    {
                                        phrase: t(
                                            'setting.account_deletion.write_delete',
                                        ),
                                    },
                                )}
                            </DialogContentText>
                            <TextField
                                required
                                margin='dense'
                                placeholder={t(
                                    'setting.account_deletion.write_delete',
                                )}
                                fullWidth
                                variant='standard'
                                value={inputPhrase}
                                onChange={(e) => {
                                    const eVal = e.target.value;
                                    setInputPhrase(eVal);
                                }}
                                error={
                                    inputPhrase !==
                                    t('setting.account_deletion.write_delete')
                                }
                            />
                        </>
                    )}
                </BootstrapDialog>
            </Box>
        </div>
    );
}
