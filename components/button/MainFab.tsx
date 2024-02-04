import { useThemeMode } from '@/contexts/ThemeContext';
import Fab, { FabProps } from '@mui/material/Fab';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';

type Props = FabProps;

export default function MainFab({ style, color, ...props }: Props) {
    const theme = useTheme();
    const themeMode = useThemeMode();
    let fabStyles: CSSProperties = {};
    if (!color && themeMode.mode === 'dark') {
        fabStyles = {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.contrastText,
            ...style,
        };
    } else {
        fabStyles = {
            ...style,
        };
    }

    return <Fab style={fabStyles} color={color} {...props} />;
}
