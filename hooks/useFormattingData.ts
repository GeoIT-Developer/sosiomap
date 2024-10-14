import { useScopedI18n } from '@/locales/client';
import { formatDataCount } from '@/utils/helper';
import { useCallback } from 'react';

const useFormattingData = () => {
    const tFormat = useScopedI18n('unit.number');

    const formattingData = useCallback(
        (count: number | undefined) => {
            const eData = formatDataCount(count);
            return `${eData.count}${eData.label ? tFormat(eData.label) : ''}`;
        },
        [tFormat],
    );

    return {
        formattingData,
    };
};

export default useFormattingData;
