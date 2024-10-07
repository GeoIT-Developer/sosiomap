import {
    Autocomplete,
    ListItem,
    ListItemText,
    Paper,
    TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useMapLibreContext } from '@/contexts/MapLibreContext';
import useAPI from '@/hooks/useAPI';
import useTermDebounce from '@/hooks/useTermDebounce';
import API_VENDOR from '@/configs/api.vendor';
import {
    FeatureInterface,
    SearchOSMInterface,
} from '@/types/api/responses/search-osm.interface';
import { getValObject } from '@/utils';

export default function SearchBar() {
    const { myMap } = useMapLibreContext();

    const [searchTxt, setSearchTxt] = useTermDebounce('', 850);
    const [inputSearch, setInputSearch] = useState('');

    const { list: listOptions, ...apiSearchOSM } = useAPI<
        SearchOSMInterface,
        string,
        FeatureInterface[]
    >(API_VENDOR.searchOSM, {
        listkey: 'data.features',
        onError: (err) => {
            toast.error(err, { theme: 'colored' });
        },
    });

    useEffect(() => {
        setSearchTxt(inputSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputSearch]);

    useEffect(() => {
        if (!searchTxt) return;
        apiSearchOSM.call(searchTxt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTxt]);

    return (
        <Paper className='!rounded-full flex-grow'>
            <Autocomplete
                options={(listOptions || []).map((item) => item)}
                getOptionLabel={(option) =>
                    getValObject(option, 'properties.display_name', option)
                }
                renderOption={(props, option) => {
                    // @ts-ignore
                    const { key, ...otherProps } = props;
                    return (
                        <ListItem
                            key={option.properties.osm_id}
                            {...otherProps}
                        >
                            <ListItemText
                                primary={option.properties.name}
                                secondary={option.properties.display_name}
                            />
                        </ListItem>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            className: '!rounded-full w-auto',
                            startAdornment: <SearchIcon className='' />,
                        }}
                        placeholder='Search'
                        onChange={(e) => setInputSearch(e.target.value)}
                        value={inputSearch}
                    />
                )}
                size='small'
                onChange={(_e, opt) => {
                    const bbox = opt?.bbox;
                    if (!bbox) return;
                    myMap?.fitBounds(bbox, {
                        essential: true,
                    });
                }}
                loading={apiSearchOSM.loading}
            />
        </Paper>
    );
}
