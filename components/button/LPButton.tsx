import React, { useRef, ReactElement } from 'react';

interface LongPressProps {
    onLongPress: (e: React.MouseEvent | React.TouchEvent) => void;
    onClick: (e: React.MouseEvent | React.TouchEvent) => void;
    children: ReactElement;
    longPressType?: 'default' | 'release';
    delay?: number; // delay in millisecond
}

export default function LPButton({
    onLongPress,
    onClick,
    children,
    longPressType = 'default',
    delay = 500,
}: LongPressProps) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isLongPressRef = useRef(false); // Track if it's a long press
    const touchRef = useRef(false); // Track if it's a touch event

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (touchRef.current) return; // Prevent mouse event if touch has already fired
        timerRef.current = setTimeout(() => {
            isLongPressRef.current = true;
            if (longPressType === 'default') {
                onLongPress(e); // Call long press action
            }
        }, delay); // Delay in ms
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (!isLongPressRef.current) {
            onClick(e); // Call short press action
        }
        if (isLongPressRef.current && longPressType === 'release') {
            onLongPress(e); // Call long press action
        }

        isLongPressRef.current = false;
    };

    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        e.stopPropagation();
        touchRef.current = true; // Mark as touch event
        timerRef.current = setTimeout(() => {
            isLongPressRef.current = true;
            if (longPressType === 'default') {
                onLongPress(e); // Call long press action
            }
        }, delay);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.stopPropagation();
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (!isLongPressRef.current) {
            onClick(e); // Call short press action
        }
        if (isLongPressRef.current && longPressType === 'release') {
            onLongPress(e); // Call long press action
        }
        e.preventDefault();
        touchRef.current = false;
        isLongPressRef.current = false;
    };

    // Clone the passed child (Button or IconButton) and inject the long press logic
    const clonedElement = React.cloneElement(children, {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
    });

    return clonedElement;
}
