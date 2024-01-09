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
            // @ts-ignore
            window.removeEventListener(
                'deviceorientationabsolute',
                handleOrientation,
            );

            // Resolve the promise with the orientation data
            resolve({ alpha, beta, gamma });
        }

        if (window.DeviceOrientationEvent) {
            try {
                // @ts-ignore
                window.addEventListener(
                    'deviceorientationabsolute',
                    handleOrientation,
                );
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
        let isAbsolute: boolean | undefined = undefined;

        setTimeout(() => {
            if (isAbsolute === undefined) {
                isAbsolute = false;
            }
        }, 1500);

        const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
            clearTimeout(timeoutId);
            isAbsolute = true;

            timeoutId = setTimeout(() => {
                setOrientation({
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma,
                });
            }, 10);
        };

        // @ts-ignore
        window.addEventListener(
            'deviceorientationabsolute',
            handleDeviceOrientation,
        );

        setTimeout(() => {
            if (isAbsolute === false) {
                window.addEventListener(
                    'deviceorientation',
                    handleDeviceOrientation,
                );
            }
        }, 1550);

        return () => {
            window.removeEventListener(
                'deviceorientation',
                handleDeviceOrientation,
            );
            // @ts-ignore
            window.removeEventListener(
                'deviceorientationabsolute',
                handleDeviceOrientation,
            );
            clearTimeout(timeoutId);
        };
    }, []);

    return orientation;
};

export default useDeviceOrientation;
