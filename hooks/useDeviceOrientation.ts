import { useEffect, useState } from 'react';

export interface DeviceOrientation {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}

export async function getDeviceOrientationOnce(): Promise<DeviceOrientation> {
    return new Promise(async (resolve) => {
        function handleOrientation(event: DeviceOrientationEvent) {
            // Access device orientation information from the event object
            const alpha = event.alpha; // Rotation around the z-axis (compass heading)
            const beta = event.beta; // Rotation around the x-axis (front-to-back tilt)
            const gamma = event.gamma; // Rotation around the y-axis (left-to-right tilt)

            // Remove the event listener after getting the orientation
            window.removeEventListener('deviceorientation', handleOrientation);

            // Resolve the promise with the orientation data
            resolve({ alpha, beta, gamma });
        }

        if (window.DeviceOrientationEvent) {
            try {
                window.addEventListener('deviceorientation', handleOrientation);
            } catch (error: any) {
                console.error('Error:', error.message);
                resolve({ alpha: null, beta: null, gamma: null });
            }
        } else {
            console.error('DeviceOrientation is not supported');
            resolve({ alpha: null, beta: null, gamma: null });
        }
    });
}

const useDeviceOrientation = () => {
    const [orientation, setOrientation] = useState<DeviceOrientation>({
        alpha: null, // rotation around the z-axis (compass heading)
        beta: null, // rotation around the x-axis (front-to-back tilt)
        gamma: null, // rotation around the y-axis (left-to-right tilt)
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setOrientation({
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma,
                });
            }, 10);
        };

        window.addEventListener('deviceorientation', handleDeviceOrientation);
        return () => {
            window.removeEventListener(
                'deviceorientation',
                handleDeviceOrientation
            );
            clearTimeout(timeoutId);
        };
    }, []);

    return orientation;
};

export default useDeviceOrientation;
