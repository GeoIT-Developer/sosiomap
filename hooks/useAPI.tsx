import { ObjectLiteral } from '@/types/object-literal.interface';
import { errorResponse, getValObject } from '@/utils';
import { useEffect, useRef, useState } from 'react';

type ArgsProps<DataType, ParamsType, ListType, MetaType> = {
    onSuccess?: (
        raw: any,
        res: {
            params?: ParamsType;
            data: DataType;
            list?: ListType;
            meta?: MetaType;
        },
    ) => void;
    onError?: (err: any, params?: ParamsType) => void;
    dataKey?: string;
    listkey?: string;
    metaKey?: string;
    callOnFirstRender?: boolean;
    callOnFirstRenderParams?: ParamsType;
};

export type UseAPIResult<
    DataType,
    ParamsType = ObjectLiteral,
    ListType = ObjectLiteral[],
    MetaType = ObjectLiteral,
> = {
    data: DataType | null;
    loading: boolean;
    error: string | null;
    call: (params?: ParamsType) => void;
    callAndWait: (params?: ParamsType) => Promise<{
        params?: ParamsType;
        data: DataType;
        list?: ListType;
        meta?: MetaType;
    }>;
    list: ListType | null;
    meta: MetaType | null;
    clearData: () => void;
};

/**
 * A custom hook to manage API calls and state.
 *
 * @template DataType The type of the data returned by the API.
 * @template ParamsType The type of the parameters passed to the API.
 * @template ListType The type of the list returned by the API.
 * @template MetaType The type of the metadata returned by the API.
 *
 * @param {Function} API The API function to be called.
 * @param {ArgsProps<DataType, ParamsType, ListType, MetaType>} [args] Optional arguments for the API call.
 *
 * @returns {Object} The state and handlers for managing API calls.
 * @returns {DataType | null} data The data returned by the API.
 * @returns {ListType | null} list The list returned by the API.
 * @returns {MetaType | null} meta The metadata returned by the API.
 * @returns {boolean} loading The loading state of the API call.
 * @returns {string | null} error The error state of the API call.
 */
const useAPI = <
    DataType,
    ParamsType = ObjectLiteral,
    ListType = ObjectLiteral[],
    MetaType = ObjectLiteral,
>(
    API: Function,
    args?: ArgsProps<DataType, ParamsType, ListType, MetaType>,
): UseAPIResult<DataType, ParamsType, ListType, MetaType> => {
    const [data, setData] = useState<DataType | null>(null);
    const [list, setList] = useState<ListType | null>(null);
    const [meta, setMeta] = useState<MetaType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const refLoading = useRef(false);

    const call = (params?: ParamsType) => {
        if (refLoading.current) return;
        refLoading.current = true;
        setLoading(true);
        API(params || {})
            .then((res: any) => {
                const datas = res.data;
                if (!datas) throw new Error(res.status.toString());
                setError(null);
                if (args?.dataKey) {
                    setData(getValObject(datas, args.dataKey, {}));
                } else {
                    setData(datas);
                }
                if (args?.listkey) {
                    setList(getValObject(datas, args.listkey, []));
                }
                if (args?.metaKey) {
                    setMeta(getValObject(datas, args.metaKey, {}));
                }
                if (args?.onSuccess) {
                    const parse: {
                        params?: ParamsType;
                        data: DataType;
                        list?: ListType;
                        meta?: MetaType;
                    } = {
                        params: params,
                        data: res.data,
                    };
                    if (args?.dataKey) {
                        parse.data = getValObject(datas, args.dataKey, {});
                    }
                    if (args?.listkey) {
                        parse.list = getValObject(datas, args.listkey, []);
                    }
                    if (args?.metaKey) {
                        parse.meta = getValObject(datas, args.metaKey, {});
                    }
                    args.onSuccess(res, parse);
                }
            })
            .catch((err: any) => {
                setData(null);
                setError(errorResponse(err));
                if (args?.onError) {
                    args.onError(errorResponse(err), params);
                }
                if (args?.listkey) {
                    setList(null);
                }
                if (args?.metaKey) {
                    setMeta(null);
                }
            })
            .finally(() => {
                setLoading(false);
                refLoading.current = false;
            });
    };

    const callAndWait = (
        params?: ParamsType,
    ): Promise<{
        params?: ParamsType;
        data: DataType;
        list?: ListType;
        meta?: MetaType;
    }> => {
        setLoading(true);

        return new Promise((resolve, reject) => {
            API(params || {})
                .then((res: any) => {
                    const datas = res.data;
                    if (!datas) {
                        throw new Error(res.status.toString());
                    }
                    setError(null);

                    const parse: {
                        params?: ParamsType;
                        data: DataType;
                        list?: ListType;
                        meta?: MetaType;
                    } = {
                        params: params,
                        data: datas,
                    };

                    if (args?.dataKey) {
                        const eData = getValObject(datas, args.dataKey, {});
                        parse.data = eData;
                        setData(eData);
                    } else {
                        setData(datas);
                    }
                    if (args?.listkey) {
                        const eList = getValObject(datas, args.listkey, []);
                        parse.list = eList;
                        setList(eList);
                    }
                    if (args?.metaKey) {
                        const eMeta = getValObject(datas, args.metaKey, {});
                        parse.meta = eMeta;
                        setMeta(eMeta);
                    }
                    if (args?.onSuccess) {
                        args.onSuccess(res, parse);
                    }
                    resolve(parse);
                })
                .catch((err: any) => {
                    setData(null);
                    setError(errorResponse(err));
                    if (args?.onError) {
                        args.onError(errorResponse(err), params);
                    }
                    if (args?.listkey) {
                        setList(null);
                    }
                    if (args?.metaKey) {
                        setMeta(null);
                    }
                    reject(errorResponse(err)); // Reject the promise with the error
                })
                .finally(() => setLoading(false));
        });
    };

    const clearData = () => {
        setData(null);
        setError(null);
        if (args?.listkey) {
            setList(null);
        }
        if (args?.metaKey) {
            setMeta(null);
        }
    };

    useEffect(() => {
        if (args?.callOnFirstRender) {
            call(args.callOnFirstRenderParams as ParamsType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, loading, error, call, callAndWait, list, meta, clearData };
};
export default useAPI;
