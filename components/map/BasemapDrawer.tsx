import { Fragment, ReactElement, cloneElement, useState } from 'react';
import {
    Box,
    Divider,
    Fab,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { BASEMAP, useBasemapContext } from '@/contexts/BasemapContext';
import MyImage from '../preview/MyImage';
import { ASSETS } from '@/utils/constant';
import { useScopedI18n } from '@/locales/client';
import { capitalizeWords } from '@/utils/helper';
import useWideScreen from '@/hooks/useWideScreen';
import CommonDrawer from '../drawer/CommonDrawer';

const defaultButton = (
    <Fab color='default' aria-label='basemaps' size='small'>
        <MapIcon />
    </Fab>
);

export default function BasemapDrawer({
    menuButton = defaultButton,
}: {
    menuButton?: ReactElement;
}) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { basemap, setBasemap } = useBasemapContext();
    const t = useScopedI18n('map');
    const isWide = useWideScreen();

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setOpenDrawer(open);
        };

    const clonedButton = cloneElement(menuButton, {
        onClick: toggleDrawer(true),
    });

    return (
        <>
            {clonedButton}
            <CommonDrawer
                anchor={isWide ? 'right' : 'bottom'}
                open={openDrawer}
                toggleDrawer={toggleDrawer}
            >
                <Box className='min-h-[35vh] p-4 text-center'>
                    {Object.keys(BASEMAP).map((key) => {
                        return (
                            <Fragment key={key}>
                                <Divider className='!my-2'>
                                    {key === 'PRIMARY'
                                        ? t('map_style')
                                        : capitalizeWords(key)}
                                </Divider>
                                <ToggleButtonGroup
                                    value={basemap}
                                    exclusive
                                    onChange={(_e, val) => {
                                        if (!val) return;
                                        setBasemap(val);
                                    }}
                                    aria-label={key}
                                >
                                    {BASEMAP[key as keyof typeof BASEMAP].map(
                                        (item, idx) => {
                                            return (
                                                <ToggleButton
                                                    key={idx}
                                                    value={item.id}
                                                    aria-label={item.name}
                                                    onClick={() =>
                                                        setBasemap(item.id)
                                                    }
                                                >
                                                    <Stack>
                                                        <MyImage
                                                            src={`${ASSETS.BASEMAP_IMAGE}${item.id}.png`}
                                                            alt={item.id}
                                                            className='w-16 self-center rounded-lg'
                                                        />
                                                        <span className='!normal-case !text-sm'>
                                                            {item.name}
                                                        </span>
                                                    </Stack>
                                                </ToggleButton>
                                            );
                                        },
                                    )}
                                </ToggleButtonGroup>
                            </Fragment>
                        );
                    })}
                </Box>
            </CommonDrawer>
        </>
    );
}
