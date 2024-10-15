'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/locales/client';
import React from 'react';
import { LOCAL_STORAGE, ROUTE_EXTERNAL } from '@/utils/constant';
import BootstrapDialog from '@/components/dialog/BootstrapDialog';
import { Button } from '@mui/material';
import { isAndroidBrowser, isTWA } from '@/utils/helper';
import useLocalStorageUn from '@/hooks/useLocalStorageUn';

enum InstallAndroidAppResponse {
    REMIND_ME = 'remind-me',
    NEVER = 'never',
    INSTALL = 'install',
}

export default function PopupAppPage() {
    const t = useI18n();
    const [isInstall, setIsInstall] =
        useLocalStorageUn<InstallAndroidAppResponse>(
            LOCAL_STORAGE.INSTALL_ANDROID_APP_POPUP,
            InstallAndroidAppResponse.REMIND_ME,
        );
    const [openDialog, setOpenDialog] = useState(false);
    const refAlreadyOpen = useRef(false);

    useEffect(() => {
        if (refAlreadyOpen.current) return;
        if (isInstall === InstallAndroidAppResponse.REMIND_ME) {
            const isValidBrowser = isAndroidBrowser() && !isTWA();
            if (isValidBrowser) {
                setTimeout(() => {
                    setOpenDialog(true);
                    refAlreadyOpen.current = true;
                }, 5000);
            } else {
                setIsInstall(InstallAndroidAppResponse.NEVER);
            }
        }
    }, [isInstall]);

    function onClickInstall() {
        window.open(ROUTE_EXTERNAL.PLAY_STORE.URL, '_blank');
        setOpenDialog(false);
        setIsInstall(InstallAndroidAppResponse.INSTALL);
    }

    function onClickNever() {
        setOpenDialog(false);
        setIsInstall(InstallAndroidAppResponse.NEVER);
    }

    function onClickRemindMe() {
        setOpenDialog(false);
        setIsInstall(InstallAndroidAppResponse.REMIND_ME);
    }

    return (
        <>
            <BootstrapDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                maxWidth='sm'
                title={t('info.install_android_app')}
                action={
                    <>
                        <Button variant='outlined' onClick={onClickRemindMe}>
                            {t('info.remind_me')}
                        </Button>
                        <Button variant='outlined' onClick={onClickNever}>
                            {t('info.never')}
                        </Button>
                        <Button variant='contained' onClick={onClickInstall}>
                            {t('info.install')}
                        </Button>
                    </>
                }
                disableOutsideClick
            >
                {t('info.install_android_app_desc')}
            </BootstrapDialog>
        </>
    );
}
