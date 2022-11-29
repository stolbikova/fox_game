
import React, { useState, useEffect } from 'react';
import { useCountdown } from '../../../../hooks/useCountdown';

interface CounterProps {
    countdown: number;
    onExpire: () => void;
}
export const Counter: React.FC<CounterProps> = ({ countdown, onExpire }) => {
    const [minutes, seconds, countDown] = useCountdown(countdown);
    const [isExpired, setIsExpired] = useState<boolean>(false);
    useEffect(() => {
        if (seconds < 0) {
            setIsExpired(true);
            onExpire();
        }
    }, [seconds]);

    if (isExpired) {
        return <span>Expired</span>
    }

    return (<span>countdown: {seconds} s</span>)
}

export default Counter;