import { ReactElement, cloneElement, useState } from 'react';
import { Avatar, Box, Fab, Icon } from '@mui/material';
import useWideScreen from '@/hooks/useWideScreen';
import LayersIcon from '@mui/icons-material/Layers';
import { useActiveTopic } from '@/hooks/useTopic';
import SingleAccordion from '@/components/accordion/SingleAccordion';
import CommonDrawer from '@/components/drawer/CommonDrawer';
import { useScopedI18n } from '@/locales/client';

const defaultButton = (
    <Fab color='default' aria-label='layers' size='small'>
        <LayersIcon />
    </Fab>
);

export default function LayerDrawer({
    menuButton = defaultButton,
}: {
    menuButton?: ReactElement;
}) {
    const t = useScopedI18n('map');
    const [openDrawer, setOpenDrawer] = useState(false);
    const activeTopic = useActiveTopic();
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
                title={t('layers')}
            >
                <Box
                    className='min-h-[35vh] text-center'
                    style={
                        isWide ? { maxWidth: '400px' } : { maxHeight: '100vh' }
                    }
                >
                    {activeTopic.map((item, idx) => {
                        return (
                            <SingleAccordion
                                title={
                                    <>
                                        <Avatar
                                            className='mr-2'
                                            sx={{
                                                bgcolor: item.bgColor,
                                                width: 24,
                                                height: 24,
                                            }}
                                        >
                                            {typeof item.icon === 'string' ? (
                                                <Icon style={{ width: 16 }}>
                                                    {item.icon}
                                                </Icon>
                                            ) : (
                                                cloneElement(item.icon, {
                                                    style: { width: 16 },
                                                })
                                            )}
                                        </Avatar>
                                        {item.label}
                                    </>
                                }
                                key={idx}
                            >
                                {item.description}
                            </SingleAccordion>
                        );
                    })}
                </Box>
            </CommonDrawer>
        </>
    );
}
