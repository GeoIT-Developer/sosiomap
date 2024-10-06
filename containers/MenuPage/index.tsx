import useWindowHeight from '@/hooks/useWindowHeight';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import PageAppBar from './PageAppBar';
import { grey } from '@mui/material/colors';
import MenuButton from './MenuButton';
import usePageLoaded from '@/hooks/usePageLoaded';
import SingleAccordion from '@/components/accordion/SingleAccordion';
import AddIcon from '@mui/icons-material/Add';
import { TopicType, useMainTopic, usePemiluTopic } from '@/hooks/useTopic';
import { useI18n } from '@/locales/client';
import { toast } from 'react-toastify';
import MyImage from '@/components/preview/MyImage';
import { useActiveTopicContext } from '../AppPage/PageContext';

const PEMILU_ASSEST = '/img/pemilu';

const LIST_BACKLINK_PEMILU = [
    {
        label: 'Kawal Pemilu',
        url: 'https://kawalpemilu.org/',
        logo: `${PEMILU_ASSEST}/kawalpemilu.png`,
    },
    {
        label: 'JagaSuara 2024',
        url: 'https://jagasuara2024.com/',
        logo: `${PEMILU_ASSEST}/jagasuara2024.png`,
    },
    {
        label: 'Warga Jaga Suara',
        url: 'https://wargajagasuara.com/',
        logo: `${PEMILU_ASSEST}/wargajagasuara.png`,
    },
    {
        label: 'Bijak Memilih',
        url: 'https://www.bijakmemilih.id/',
        logo: `${PEMILU_ASSEST}/bijakmemilih.png`,
    },
    {
        label: 'Kawula 17',
        url: 'https://kawula17.id/',
        logo: `${PEMILU_ASSEST}/kawula17.png`,
    },
    {
        label: 'Rekan Jejak',
        url: 'https://rekamjejak.net/',
        logo: `${PEMILU_ASSEST}/rekamjejak.png`,
    },
    {
        label: 'Rumah Pemilu',
        url: 'https://rumahpemilu.org/',
        logo: `${PEMILU_ASSEST}/rumahpemilu.png`,
    },
    {
        label: 'Info Pemilu',
        url: 'https://infopemilu.kpu.go.id/',
        logo: `${PEMILU_ASSEST}/kpu.png`,
    },
];

export default function MenuPage({ show = true }: { show?: boolean }) {
    const t = useI18n();
    const { fragmentHeightStyle } = useWindowHeight();
    const mainTopic = useMainTopic();
    const pemiluTopic = usePemiluTopic();
    const { activeTopic, setActiveTopic, refreshTopic } =
        useActiveTopicContext();

    function onClickTopic(topic: TopicType, lastChecked: boolean) {
        if (!lastChecked) {
            setActiveTopic((oldState) => [...oldState, topic.id]);
        } else {
            setActiveTopic((oldState) =>
                oldState.filter((item) => item !== topic.id),
            );
        }
        refreshTopic();
    }

    const pageLoaded = usePageLoaded(show);
    if (!show && !pageLoaded) {
        return null;
    }

    return (
        <div className={show ? '' : 'hidden'}>
            <PageAppBar />
            <Paper
                className='overflow-y-auto !rounded-none pb-4'
                style={{ height: fragmentHeightStyle }}
            >
                <Box>
                    <Divider className='py-4'>{t('topic.main_topics')}</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 4 }}
                        className='px-4'
                    >
                        {mainTopic.map((item, idx) => {
                            const isChecked =
                                activeTopic.indexOf(item.id) !== -1;
                            return (
                                <Grid key={idx} item xs={1}>
                                    <MenuButton
                                        label={item.label}
                                        bgColor={item.bgColor}
                                        icon={item.icon}
                                        checkbox
                                        checked={isChecked}
                                        onClick={() =>
                                            onClickTopic(item, isChecked)
                                        }
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box className='px-2'>
                        <SingleAccordion
                            type='compact'
                            title={
                                <Typography>
                                    &#9432; {t('label.info')}
                                </Typography>
                            }
                        >
                            <Typography variant='body2'>
                                {t('topic.main_topics_desc')}
                            </Typography>
                            {mainTopic.map((item, idx) => {
                                return (
                                    <Box className='flex mt-2' key={idx}>
                                        <Typography
                                            sx={{
                                                width: '30%',
                                                flexShrink: 0,
                                                fontWeight: 'bold',
                                            }}
                                            variant='body2'
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {item.description}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </SingleAccordion>
                    </Box>
                </Box>
                {/* <Box>
                    <Divider className='py-4'>{t('topic.pemilu_2024')}</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 4 }}
                        className='px-4'
                    >
                        {pemiluTopic.map((item, idx) => {
                            const isChecked =
                                activeTopic.indexOf(item.id) !== -1;
                            return (
                                <Grid key={idx} item xs={1}>
                                    <MenuButton
                                        label={item.label}
                                        bgColor={item.bgColor}
                                        icon={item.icon}
                                        checkbox
                                        checked={isChecked}
                                        onClick={() =>
                                            onClickTopic(item, isChecked)
                                        }
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Divider className='py-4'>
                        {t('topic.pemilu_2024_backlink')}
                    </Divider>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 4 }}
                        className='px-4'
                    >
                        {LIST_BACKLINK_PEMILU.map((item, idx) => {
                            return (
                                <Grid key={idx} item xs={1}>
                                    <IconButton
                                        key={idx}
                                        className='w-fit h-fit !rounded-md !p-0'
                                        onClick={() =>
                                            window.open(item.url, '_blank')
                                        }
                                    >
                                        <Box>
                                            <MyImage
                                                src={item.logo}
                                                alt={item.logo}
                                                style={{
                                                    width: '4.5rem',
                                                    height: '4.5rem',
                                                    objectFit: 'contain',
                                                    borderRadius: '0.5rem',
                                                }}
                                                className='!bg-gray-600'
                                            />
                                            <Typography
                                                variant='caption'
                                                className='!block !text-xs'
                                            >
                                                {item.label}
                                            </Typography>
                                        </Box>
                                    </IconButton>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box className='px-2'>
                        <SingleAccordion
                            type='compact'
                            title={
                                <Typography>
                                    &#9432; {t('label.info')}
                                </Typography>
                            }
                        >
                            <Typography variant='body2'>
                                {t('topic.pemilu_2024_desc')}
                            </Typography>
                            {pemiluTopic.map((item, idx) => {
                                return (
                                    <Box className='flex mt-2' key={idx}>
                                        <Typography
                                            sx={{
                                                width: '30%',
                                                flexShrink: 0,
                                                fontWeight: 'bold',
                                            }}
                                            variant='body2'
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {item.description}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </SingleAccordion>
                    </Box>
                </Box> */}
                <Box>
                    <Divider className='py-4'>{t('topic.open_topics')}</Divider>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={{ xs: 4 }}
                        className='px-4'
                    >
                        <Grid item xs={1}>
                            <MenuButton
                                label={t('topic.create_topic')}
                                bgColor={grey[300]}
                                icon={<AddIcon sx={{ color: grey[900] }} />}
                                onClick={() =>
                                    toast.info(t('message.info.coming_soon'), {
                                        theme: 'colored',
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Box className='px-2'>
                        <SingleAccordion
                            type='compact'
                            title={
                                <Typography>
                                    &#9432; {t('label.info')}
                                </Typography>
                            }
                        >
                            <Typography variant='body2'>
                                {t('topic.open_topics_desc')}
                            </Typography>
                        </SingleAccordion>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
