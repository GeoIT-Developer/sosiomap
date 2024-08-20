import { useEffect, useState } from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number | string;
    value: number | string;
    className?: string;
    keepMounted?: boolean;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, keepMounted, ...other } = props;

    // State to track if the tab has been opened at least once
    const [isMounted, setIsMounted] = useState(false);

    // Update the isMounted state when the tab is opened
    useEffect(() => {
        if (value === index) {
            setIsMounted(true);
        }
    }, [value, index]);

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {keepMounted
                ? isMounted && <>{children}</>
                : value === index && <>{children}</>}
        </div>
    );
}

export function a11yProps(index: number | string) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}
