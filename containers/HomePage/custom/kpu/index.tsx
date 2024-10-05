import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { ReactNode, useEffect, useState } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API_VENDOR, { ParamsKPUType } from '@/configs/api.vendor';
import MapLibreGL, { MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import CommonDrawer, {
    useCommonDrawer,
} from '@/components/drawer/CommonDrawer';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    addBaseUrlToFormAction,
    changeImgSrc,
    getDapilFromString,
} from '@/utils/kpu-helper';
import { useActiveTopicContext } from '@/containers/AppPage';
import { getLastCharFromString, getMapLibreCoordinate } from '@/utils/helper';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { useWideScreenContext } from '@/contexts/ResponsiveContext';

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
    const isWide = useWideScreenContext();

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

    const { openDrawer, toggleDrawer } = useCommonDrawer();

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
                const eFeature = getMapLibreCoordinate(e);
                if (!eFeature) return;

                const placeholder = document.createElement('div');
                const root = createRoot(placeholder);
                const eTitle = 'DPR - ' + eFeature.properties.alias;
                root.render(
                    <Stack spacing={1}>
                        <Typography variant='body1'>{eTitle}</Typography>
                        <Button
                            size='small'
                            variant='contained'
                            onClick={() => {
                                const properties = eFeature.properties;
                                const unixTime = Date.now();
                                setListData([]);
                                apiKPU.call({
                                    id: `${
                                        properties.id_provins
                                    }${getLastCharFromString(
                                        properties.dapil,
                                        2,
                                    )}`,
                                    timestamp: unixTime,
                                    type: 'DPR',
                                });
                                setDrawerTitle(eTitle);
                                toggleDrawer(true)(e as any);
                            }}
                        >
                            Daftar Calon
                        </Button>
                    </Stack>,
                );
                new MapLibreGL.Popup({
                    closeButton: false,
                    closeOnClick: true,
                    className: 'text-xl text-black font-bold !my-0',
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(placeholder)
                    .addTo(myMap);
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
                const eFeature = getMapLibreCoordinate(e);
                if (!eFeature) return;

                const placeholder = document.createElement('div');
                const root = createRoot(placeholder);
                const eTitle = 'DPD - ' + eFeature.properties.wadmpr;
                root.render(
                    <Stack spacing={1}>
                        <Typography variant='body1'>{eTitle}</Typography>
                        <Button
                            size='small'
                            variant='contained'
                            onClick={() => {
                                const properties = eFeature.properties;
                                const unixTime = Date.now();
                                setListData([]);
                                apiKPU.call({
                                    id: properties.kdppum,
                                    timestamp: unixTime,
                                    type: 'DPD',
                                });
                                setDrawerTitle(eTitle);
                                toggleDrawer(true)(e as any);
                            }}
                        >
                            Daftar Calon
                        </Button>
                    </Stack>,
                );
                new MapLibreGL.Popup({
                    closeButton: false,
                    closeOnClick: true,
                    className: 'text-xl text-black font-bold !my-0',
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(placeholder)
                    .addTo(myMap);
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
                const eFeature = getMapLibreCoordinate(e);
                if (!eFeature) return;

                const placeholder = document.createElement('div');
                const root = createRoot(placeholder);
                const eTitle = 'DPRD Provinsi - ' + eFeature.properties.alias;
                root.render(
                    <Stack spacing={1}>
                        <Typography variant='body1'>{eTitle}</Typography>
                        <Button
                            size='small'
                            variant='contained'
                            onClick={() => {
                                const properties = eFeature.properties;
                                const unixTime = Date.now();
                                setListData([]);
                                apiKPU.call({
                                    id: `${properties.id_provins}${
                                        properties.id_kabkot
                                    }${getDapilFromString(properties.alias)}`,
                                    timestamp: unixTime,
                                    type: 'DPRD_PROV',
                                });
                                setDrawerTitle(eTitle);
                                toggleDrawer(true)(e as any);
                            }}
                        >
                            Daftar Calon
                        </Button>
                    </Stack>,
                );
                new MapLibreGL.Popup({
                    closeButton: false,
                    closeOnClick: true,
                    className: 'text-xl text-black font-bold !my-0',
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(placeholder)
                    .addTo(myMap);
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
                const eFeature = getMapLibreCoordinate(e);
                if (!eFeature) return;

                const placeholder = document.createElement('div');
                const root = createRoot(placeholder);
                const eTitle = 'DPRD Kab/Kota - ' + eFeature.properties.alias;
                root.render(
                    <Stack spacing={1}>
                        <Typography variant='body1'>{eTitle}</Typography>
                        <Button
                            size='small'
                            variant='contained'
                            onClick={() => {
                                const properties = eFeature.properties;
                                const unixTime = Date.now();
                                setListData([]);
                                apiKPU.call({
                                    id: `${properties.id_provins}${
                                        properties.id_kabkot
                                    }${getDapilFromString(properties.alias)}`,
                                    timestamp: unixTime,
                                    type: 'DPRD_KAB_KOTA',
                                });
                                setDrawerTitle(eTitle);
                                toggleDrawer(true)(e as any);
                            }}
                        >
                            Daftar Calon
                        </Button>
                    </Stack>,
                );
                new MapLibreGL.Popup({
                    closeButton: false,
                    closeOnClick: true,
                    className: 'text-xl text-black font-bold !my-0',
                })
                    .setLngLat(e.lngLat)
                    .setDOMContent(placeholder)
                    .addTo(myMap);
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
