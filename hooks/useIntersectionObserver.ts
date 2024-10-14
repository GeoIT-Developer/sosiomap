import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
    threshold: number = 0.1, // Default threshold for visibility (10%)
    root: null | Element = null, // The element that is used as the viewport for checking visibility
    rootMargin: string = '0px', // Margin around the root element
) => {
    const [isIntersecting, setIsIntersecting] = useState(false); // Track whether the element is in view
    const ref = useRef<HTMLElement | null>(null); // Element reference

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsIntersecting(entry.isIntersecting); // Update state when visibility changes
            },
            {
                root,
                rootMargin,
                threshold,
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, root, rootMargin]);

    return [ref, isIntersecting] as const; // Return ref and visibility state
};
