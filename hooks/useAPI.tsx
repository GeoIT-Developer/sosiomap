import { ObjectLiteral } from '@/types/object-literal.interface';
import { errorResponse, getValObject } from '@/utils';
import { useEffect, useState } from 'react';

type ArgsProps<DataType, ParamsType, ListType, MetaType> = {
    onSuccess?: (
        raw: any,
        res?: {
            params?: ParamsType;
            data?: DataType;
            list?: ListType;
            meta?: MetaType;
        },
    ) => void;
    onError?: (err: any, params?: any) => void;
    dataKey?: string;
    listkey?: string;
    metaKey?: string;
    callOnFirstRender?: boolean;
    callOnFirstRenderParams?: any;
};

const useAPI = <
    DataType,
    ParamsType = ObjectLiteral,
    ListType = ObjectLiteral[],
    MetaType = ObjectLiteral,
>(
    API: Function,
    args?: ArgsProps<DataType, ParamsType, ListType, MetaType>,
) => {
    const [data, setData] = useState<DataType | null>(null);
    const [list, setList] = useState<ListType | null>(null);
    const [meta, setMeta] = useState<MetaType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const call = (params?: ParamsType) => {
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
                        data?: DataType;
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
            .finally(() => setLoading(false));
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

    return { data, loading, error, call, list, meta, clearData };
};
export default useAPI;
