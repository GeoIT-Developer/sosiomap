interface TabPanelProps {
    children?: React.ReactNode;
    index: number | string;
    value: number | string;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

export function a11yProps(index: number | string) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}
