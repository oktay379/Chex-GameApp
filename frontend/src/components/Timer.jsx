import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const Timer = ({ timer, setTimer, isPlayOn }) => {
    const timerId = useRef();

    useEffect(() => {
        if (!isPlayOn) return;

        timerId.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(timerId.current);
    }, [isPlayOn, setTimer]);

    useEffect(() => {
        if (timer <= 0) {
            clearInterval(timerId.current);
            toast.error("Time is Over!");
        }
    }, [timer]);

    return <div>{timer}s</div>;
};

export default Timer;
