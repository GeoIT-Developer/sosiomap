import { useState } from 'react';

const useToggleVisibility = (delay = 850) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(false);
        // Set a timeout to show the component again after the specified delay
        setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    return { isVisible, toggleVisibility };
};

export default useToggleVisibility;
