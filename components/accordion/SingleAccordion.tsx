import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

interface Props {
    children: ReactNode;
    title: ReactNode;
    type?: 'standard' | 'compact';
    defaultOpen?: boolean;
    sx?: SxProps<Theme>;
}

export default function SingleAccordion({
    title,
    children,
    type,
    defaultOpen,
    sx,
}: Props) {
    return (
        <Accordion
            sx={
                type === 'compact'
                    ? {
                          '& .MuiButtonBase-root': {
                              minHeight: '24px',
                          },
                          '& .MuiAccordionSummary-content': {
                              margin: '4px 0',
                          },
                      }
                    : {}
            }
            defaultExpanded={defaultOpen}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                {title}
            </AccordionSummary>
            <AccordionDetails sx={sx}>{children}</AccordionDetails>
        </Accordion>
    );
}
