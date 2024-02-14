import { Box, Card, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { ReactNode, useEffect, useState } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API_VENDOR, { ParamsKPUType } from '@/configs/api.vendor';
import { MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import CommonDrawer from '@/components/drawer/CommonDrawer';
import useWideScreen from '@/hooks/useWideScreen';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    addBaseUrlToFormAction,
    changeImgSrc,
    getDapilFromString,
} from '@/utils/kpu-helper';
import { useActiveTopicContext } from '@/containers/AppPage';
import { getLastCharFromString } from '@/utils/helper';

const columns: GridColDef[] = [
    {
        field: 'body',
        headerName: 'Data',
        sortable: false,
        minWidth: 350,
        maxWidth: 375,
        align: 'center',
        renderCell: ({ value }) => {
            const eVal = value as string[];

            const childElement: ReactNode[] = eVal.map((it, idy) => {
                return (
                    <div key={idy}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: addBaseUrlToFormAction(
                                    changeImgSrc(it),
                                ),
                            }}
                        />
                        <Divider />
                    </div>
                );
            });
            return (
                <Card
                    variant='outlined'
                    className='p-2 rounded-md !min-w-[350px]'
                >
                    {childElement}
                </Card>
            );
        },
    },
];

export default function KPULayer() {
    const { myMap } = useMapLibreContext();
    const { activeTopic } = useActiveTopicContext();
    const isWide = useWideScreen();

    const [drawerTitle, setDrawerTitle] = useState('');
    const [listData, setListData] = useState<{ id: string; body: string[] }[]>(
        [],
    );

    const apiKPU = useAPI<ObjectLiteral, ParamsKPUType, string[][]>(
        API_VENDOR.getDataKPU,
        {
            listkey: 'data.data',
            onError: (err) => {
                toast.error(err, { theme: 'colored' });
            },
            onSuccess: (_raw, res) => {
                const eData = (res?.list || []).map((item, idx) => {
                    return {
                        id: String(idx),
                        body: item,
                    };
                });
                setListData(eData);
            },
        },
    );

    const [openDrawer, setOpenDrawer] = useState(false);
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

    useEffect(() => {
        const dprTopic = activeTopic.find((item) => item === 'dpr');
        const layerSrc = 'map-dpr-src-mapbox';
        const layerId = 'map-dpr-layer-mapbox';
        const srcId = 'siprobowangi.6zl29pf5';
        const srcLayer = 'DAPIL_DPR_RI-668ypo';
        const srcTile = `https://api.mapbox.com/v4/${srcId}/{z}/{x}/{y}.mvt?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
        const hexLineColor = '#3498db';
        const hexFillColor = '#3498db';

        const onClickLayerMapbox = async (
            e: MapMouseEvent & {
                features?: MapGeoJSONFeature[] | undefined;
            } & Object,
        ) => {
            if (myMap) {
                if (!e.features) return;
                const properties = e.features[0].properties;
                const unixTime = Date.now();
                apiKPU.clearData();
                apiKPU.call({
                    id: `${properties.id_provins}${getLastCharFromString(
                        properties.dapil,
                        2,
                    )}`,
                    timestamp: unixTime,
                    type: 'DPR',
                });
                setDrawerTitle('DPR - ' + properties.alias);
                toggleDrawer(true)(e as any);
            }
        };

        const onMapLoad = () => {
            if (!myMap) return;

            if (myMap.getLayer(layerId + '-fill')) {
                myMap.removeLayer(layerId + '-fill');
            }
            if (myMap.getLayer(layerId)) {
                myMap.removeLayer(layerId);
            }
            if (myMap.getSource(layerSrc)) {
                myMap.removeSource(layerSrc);
            }

            if (!dprTopic) return;
            myMap.addSource(layerSrc, {
                type: 'vector',
                tiles: [srcTile],
            });

            myMap.addLayer({
                id: layerId + '-fill',
                type: 'fill',
                source: layerSrc,
                'source-layer': srcLayer,
                paint: {
                    'fill-color': hexFillColor,
                    'fill-opacity': 0.1,
                },
            });
            myMap.addLayer({
                id: layerId,
                type: 'line',
                source: layerSrc,
                'source-layer': srcLayer,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': hexLineColor,
                    'line-width': 2,
                },
            });
            myMap.on('click', layerId + '-fill', onClickLayerMapbox);
        };

        if (myMap) {
            myMap.on('load', onMapLoad);
            if (myMap.loaded()) {
                onMapLoad();
            }
        }
        return () => {
            if (myMap) {
                myMap.off('click', layerId + '-fill', onClickLayerMapbox);
                myMap.off('load', onMapLoad);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopic, myMap]);

    useEffect(() => {
        const dpdTopic = activeTopic.find((item) => item === 'dpd');
        const layerSrc = 'map-dpd-src-mapbox';
        const layerId = 'map-dpd-layer-mapbox';
        const srcId = 'siprobowangi.an2dehyi';
        const srcLayer = 'DAPIL_DPD-dfd375';
        const srcTile = `https://api.mapbox.com/v4/${srcId}/{z}/{x}/{y}.mvt?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
        const hexLineColor = '#27ae60';
        const hexFillColor = '#2ecc71';

        const onClickLayerMapbox = async (
            e: MapMouseEvent & {
                features?: MapGeoJSONFeature[] | undefined;
            } & Object,
        ) => {
            if (myMap) {
                if (!e.features) return;
                const properties = e.features[0].properties;
                const unixTime = Date.now();
                apiKPU.clearData();
                apiKPU.call({
                    id: properties.kdppum,
                    timestamp: unixTime,
                    type: 'DPD',
                });
                setDrawerTitle('DPD - ' + properties.wadmpr);
                toggleDrawer(true)(e as any);
            }
        };

        const onMapLoad = () => {
            if (!myMap) return;

            if (myMap.getLayer(layerId + '-fill')) {
                myMap.removeLayer(layerId + '-fill');
            }
            if (myMap.getLayer(layerId)) {
                myMap.removeLayer(layerId);
            }
            if (myMap.getSource(layerSrc)) {
                myMap.removeSource(layerSrc);
            }

            if (!dpdTopic) return;
            myMap.addSource(layerSrc, {
                type: 'vector',
                tiles: [srcTile],
            });

            myMap.addLayer({
                id: layerId + '-fill',
                type: 'fill',
                source: layerSrc,
                'source-layer': srcLayer,
                paint: {
                    'fill-color': hexFillColor,
                    'fill-opacity': 0.1,
                },
            });
            myMap.addLayer({
                id: layerId,
                type: 'line',
                source: layerSrc,
                'source-layer': srcLayer,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': hexLineColor,
                    'line-width': 2,
                },
            });
            myMap.on('click', layerId + '-fill', onClickLayerMapbox);
        };

        if (myMap) {
            myMap.on('load', onMapLoad);
            if (myMap.loaded()) {
                onMapLoad();
            }
        }
        return () => {
            if (myMap) {
                myMap.off('click', layerId + '-fill', onClickLayerMapbox);
                myMap.off('load', onMapLoad);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopic, myMap]);

    useEffect(() => {
        const dprdProvTopic = activeTopic.find(
            (item) => item === 'dprd_provinsi',
        );
        const layerSrc = 'map-dprd_provinsi-src-mapbox';
        const layerId = 'map-dprd_provinsi-layer-mapbox';
        const srcId = 'siprobowangi.csu7200m';
        const srcLayer = 'DAPIL_PROV-4lb2q4';
        const srcTile = `https://api.mapbox.com/v4/${srcId}/{z}/{x}/{y}.mvt?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

        const hexLineColor = '#e74c3c';
        const hexFillColor = '#c0392b';

        const onClickLayerMapbox = async (
            e: MapMouseEvent & {
                features?: MapGeoJSONFeature[] | undefined;
            } & Object,
        ) => {
            if (myMap) {
                if (!e.features) return;
                const properties = e.features[0].properties;
                const unixTime = Date.now();
                apiKPU.clearData();
                apiKPU.call({
                    id: `${properties.id_provins}${
                        properties.id_kabkot
                    }${getDapilFromString(properties.alias)}`,
                    timestamp: unixTime,
                    type: 'DPRD_PROV',
                });
                setDrawerTitle('DPRD Provinsi - ' + properties.alias);
                toggleDrawer(true)(e as any);
            }
        };

        const onMapLoad = () => {
            if (!myMap) return;

            if (myMap.getLayer(layerId + '-fill')) {
                myMap.removeLayer(layerId + '-fill');
            }
            if (myMap.getLayer(layerId)) {
                myMap.removeLayer(layerId);
            }
            if (myMap.getSource(layerSrc)) {
                myMap.removeSource(layerSrc);
            }

            if (!dprdProvTopic) return;
            myMap.addSource(layerSrc, {
                type: 'vector',
                tiles: [srcTile],
            });

            myMap.addLayer({
                id: layerId + '-fill',
                type: 'fill',
                source: layerSrc,
                'source-layer': srcLayer,
                paint: {
                    'fill-color': hexFillColor,
                    'fill-opacity': 0.1,
                },
            });
            myMap.addLayer({
                id: layerId,
                type: 'line',
                source: layerSrc,
                'source-layer': srcLayer,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': hexLineColor,
                    'line-width': 2,
                },
            });
            myMap.on('click', layerId + '-fill', onClickLayerMapbox);
        };

        if (myMap) {
            myMap.on('load', onMapLoad);
            if (myMap.loaded()) {
                onMapLoad();
            }
        }
        return () => {
            if (myMap) {
                myMap.off('click', layerId + '-fill', onClickLayerMapbox);
                myMap.off('load', onMapLoad);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopic, myMap]);

    useEffect(() => {
        const dprdKabKotaTopic = activeTopic.find(
            (item) => item === 'dprd_kab_kota',
        );
        const layerSrc = 'map-dprd_kab_kota-src-mapbox';
        const layerId = 'map-dprd_kab_kota-layer-mapbox';
        const srcId = 'siprobowangi.77abjzye';
        const srcLayer = 'DAPIL_KAB_KOTA-c5g6jk';
        const srcTile = `https://api.mapbox.com/v4/${srcId}/{z}/{x}/{y}.mvt?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

        const hexLineColor = '#f39c12';
        const hexFillColor = '#f1c40f';

        const onClickLayerMapbox = async (
            e: MapMouseEvent & {
                features?: MapGeoJSONFeature[] | undefined;
            } & Object,
        ) => {
            if (myMap) {
                if (!e.features) return;
                const properties = e.features[0].properties;
                const unixTime = Date.now();
                apiKPU.clearData();
                apiKPU.call({
                    id: `${properties.id_provins}${
                        properties.id_kabkot
                    }${getDapilFromString(properties.alias)}`,
                    timestamp: unixTime,
                    type: 'DPRD_KAB_KOTA',
                });
                setDrawerTitle('DPRD Kab/Kota - ' + properties.alias);
                toggleDrawer(true)(e as any);
            }
        };

        const onMapLoad = () => {
            if (!myMap) return;

            if (myMap.getLayer(layerId + '-fill')) {
                myMap.removeLayer(layerId + '-fill');
            }
            if (myMap.getLayer(layerId)) {
                myMap.removeLayer(layerId);
            }
            if (myMap.getSource(layerSrc)) {
                myMap.removeSource(layerSrc);
            }

            if (!dprdKabKotaTopic) return;
            myMap.addSource(layerSrc, {
                type: 'vector',
                tiles: [srcTile],
            });

            myMap.addLayer({
                id: layerId + '-fill',
                type: 'fill',
                source: layerSrc,
                'source-layer': srcLayer,
                paint: {
                    'fill-color': hexFillColor,
                    'fill-opacity': 0.1,
                },
            });
            myMap.addLayer({
                id: layerId,
                type: 'line',
                source: layerSrc,
                'source-layer': srcLayer,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': hexLineColor,
                    'line-width': 2,
                },
            });
            myMap.on('click', layerId + '-fill', onClickLayerMapbox);
        };

        if (myMap) {
            myMap.on('load', onMapLoad);
            if (myMap.loaded()) {
                onMapLoad();
            }
        }
        return () => {
            if (myMap) {
                myMap.off('click', layerId + '-fill', onClickLayerMapbox);
                myMap.off('load', onMapLoad);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTopic, myMap]);

    return (
        <>
            <CommonDrawer
                anchor={isWide ? 'right' : 'bottom'}
                open={openDrawer}
                toggleDrawer={toggleDrawer}
                title={drawerTitle}
            >
                <Box className='!min-h-[65vh]'>
                    <DataGrid
                        disableRowSelectionOnClick
                        disableColumnFilter
                        disableColumnMenu
                        getRowHeight={() => 'auto'}
                        rows={listData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        hideFooterSelectedRowCount
                        loading={apiKPU.loading}
                        style={{ minHeight: '25vh' }}
                    />
                </Box>
            </CommonDrawer>
        </>
    );
}
